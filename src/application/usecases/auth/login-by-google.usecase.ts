import { ErrorCode, UserRole } from '@Domain/constants';
import { UserEntity } from '@Domain/entity';
import { BadRequestException } from '@Infrastructure/exception';
import { BcryptService } from '@Infrastructure/service/bcrypt';
import { JwtService } from '@Infrastructure/service/jwt';
import { UserRepositoryOrm } from '@Infrastructure/typeorm/postgres/imp-repository';
import { Injectable } from '@nestjs/common';
import { LoginCustomerParamDto, LoginGoogleParamDto } from '@Presentation/auth/dto/param';
import { AuthResultDto } from '@Presentation/auth/dto/result';

@Injectable()
export class LoginByGoogleUseCase {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly userRepositoryOrm: UserRepositoryOrm,
  ) {}

  async execute(param: LoginGoogleParamDto) {
    const { creadential } = param;
    const payload = this.jwtService.decodeJwtPayload(creadential);

    let result = await this.userRepositoryOrm.findByPhoneNumberOrEmail(payload.email);

    if (result == null) {
     const user = new UserEntity({
        fullName: payload.name,
        email: payload.email,
        role: UserRole.CUSTOMER
      });

      const result = await this.userRepositoryOrm.create(user);
      if (!result) throw new BadRequestException('AUTH009', ErrorCode.AUTH009);
    }

    if (result.role == UserRole.ADMIN) throw new BadRequestException('AUTH002', ErrorCode.AUTH002);

    const accessToken = await this.jwtService.generateAccessToken({
      userId: result.id,
    });

    const refreshToken = await this.jwtService.generateRefreshToken({
      userId: result.id,
    });

    const updateRefreshToken = await this.userRepositoryOrm.updateRefreshToken(result.id, refreshToken);
    if (!result) throw new BadRequestException('AUTH004', ErrorCode.AUTH004);

    return new AuthResultDto({
      accessToken,
      result: updateRefreshToken,
    });
  }
}
