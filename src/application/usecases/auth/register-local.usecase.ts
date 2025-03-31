import {ErrorCode} from '@Domain/constants';
import {UserEntity} from '@Domain/entity';
import {BadRequestException} from '@Infrastructure/exception';
import {BcryptService} from '@Infrastructure/service/bcrypt';
import {JwtService} from '@Infrastructure/service/jwt';
import {UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {RegisterParamDto} from '@Presentation/auth/dto/param';
import {AuthResultDto} from '@Presentation/auth/dto/result';

@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        private readonly userRepositoryOrm: UserRepositoryOrm,
    ) {
    }

    async execute(param: RegisterParamDto) {
        const {phoneNumber,password,fullName,email,birthDay}= param

        const isExistsEmail =await this.userRepositoryOrm.checkExistsEmail(email);
        if(isExistsEmail)  throw new BadRequestException('AUTH007', ErrorCode.AUTH007);
        const isExistsPhoneNumber =await this.userRepositoryOrm.checkExistsPhoneNumber(phoneNumber);
        if(isExistsPhoneNumber)  throw new BadRequestException('AUTH008', ErrorCode.AUTH008);

        const passwordHash = await this.bcryptService.hash(param.password);

        const newUser = new UserEntity({
            fullName: param.fullName,
            phoneNumber: param.phoneNumber,
            email: param.email,
            password: passwordHash
        });
       
        const result = await this.userRepositoryOrm.create(newUser);
        if (!result) throw new BadRequestException('AUTH009', ErrorCode.AUTH009);

        const accessToken = await this.jwtService.generateAccessToken({
            userId: result.id,
        });
        const refreshToken = await this.jwtService.generateRefreshToken({
            userId: result.id,
        });

        const updateRefreshToken = await this.userRepositoryOrm.updateRefreshToken(result.id, refreshToken);
        if (!updateRefreshToken) throw new BadRequestException('AUTH004', ErrorCode.AUTH004);

        return new AuthResultDto({
            accessToken,
            result: updateRefreshToken
        });
    }
}
