import {Injectable} from '@nestjs/common';
import {UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {BadRequestException} from '@Infrastructure/exception';
import {ErrorCode} from '@Domain/constants';
import {UserMapper} from '@Infrastructure/service/mapper/user';

@Injectable()
export class FindProfileUsecase {
    constructor(
        private readonly userRepository: UserRepositoryOrm,
        private readonly userMapper: UserMapper,
    ) {
    }

    async execute(userId: number) {
        var user = await this.userRepository.findOneById(userId);
        if (!user) throw new BadRequestException('USER001', ErrorCode.USER001);
        var dataReturn = this.userMapper.toProfileResultDto(user);
        return dataReturn;
    }
}
