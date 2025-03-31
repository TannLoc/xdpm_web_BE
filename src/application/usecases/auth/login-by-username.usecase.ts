import {ErrorCode} from '@Domain/constants/error-code.constant';
import {BadRequestException} from '@Infrastructure/exception';
import {BcryptService} from '@Infrastructure/service/bcrypt/bcrypt.service';
import {JwtService} from '@Infrastructure/service/jwt/jwt.service';
import {UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {LoginEmployeeParamDto} from '@Presentation/auth/dto/param';
import {AuthResultDto} from '@Presentation/auth/dto/result';
import {UserRole} from "@Domain/constants";

@Injectable()
export class LoginByUsernameUseCase {
    constructor(
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        private readonly userRepositoryOrm: UserRepositoryOrm,
    ) {
    }

    async execute(param: LoginEmployeeParamDto) {
        const {username, password} = param;

        const user = await this.userRepositoryOrm.findOneByUsername(username);
        if (!user || user.role != UserRole.ADMIN) throw new BadRequestException('AUTH002', ErrorCode.AUTH002);

        const checkPassword = await this.bcryptService.compare(password, user.password);
        if (!checkPassword) throw new BadRequestException('AUTH002', ErrorCode.AUTH002);

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
