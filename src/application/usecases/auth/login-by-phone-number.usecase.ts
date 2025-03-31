import {ErrorCode, UserRole} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {BcryptService} from '@Infrastructure/service/bcrypt';
import {JwtService} from '@Infrastructure/service/jwt';
import {UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {LoginCustomerParamDto} from '@Presentation/auth/dto/param';
import {AuthResultDto} from '@Presentation/auth/dto/result';

@Injectable()
export class LoginByPhoneNumberUseCase {
    constructor(
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        private readonly userRepositoryOrm: UserRepositoryOrm,
    ) {
    }

    async execute(param: LoginCustomerParamDto) {
        const {phoneNumber, password} = param;

        const user = await this.userRepositoryOrm.findByPhoneNumber(phoneNumber);
        const checkPassword =user ? await this.bcryptService.compare(password, user.password) : null;

        if (!user || !checkPassword ||  user.role == UserRole.ADMIN) throw new BadRequestException('AUTH002', ErrorCode.AUTH002);

        const accessToken = await this.jwtService.generateAccessToken({
            userId: user.id,
        });

        const refreshToken = await this.jwtService.generateRefreshToken({
            userId: user.id,
        });

        const result =await this.userRepositoryOrm.updateRefreshToken(user.id, refreshToken);
        if (!result) throw new BadRequestException('AUTH004', ErrorCode.AUTH004);

        return new AuthResultDto({
            accessToken,
            result
        });
    }
}
