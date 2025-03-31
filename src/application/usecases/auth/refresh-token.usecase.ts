import {JwtService} from '@Infrastructure/service/jwt';
import {UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {AuthResultDto} from '@Presentation/auth/dto/result';

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepositoryOrm,
    ) {
    }

    async execute(id: number){
        const accessToken = await this.jwtService.generateAccessToken({
            userId: id,
        });
        return new AuthResultDto({
            accessToken,
        });
    }
}
