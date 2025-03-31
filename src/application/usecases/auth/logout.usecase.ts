import {UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {AuthResultDto} from '@Presentation/auth/dto/result';

@Injectable()
export class LogoutUseCase {
    constructor(private readonly userRepository: UserRepositoryOrm) {
    }

    async execute(id: number) {
        const result = await this.userRepository.updateRefreshToken(id, null);
        return new AuthResultDto({result});
    }
}
