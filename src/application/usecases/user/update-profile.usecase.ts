import {Injectable} from '@nestjs/common';
import {CloudinaryRepositoryOrm, UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {BadRequestException} from '@Infrastructure/exception';
import {ErrorCode} from '@Domain/constants';
import {UpdateProfileParamDto} from '@Presentation/user/dto/param';
import {CloudinaryEntity} from '@Domain/entity';
import {UpdatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class UpdateProfileUsecase {
    constructor(
        private readonly userRepository: UserRepositoryOrm,
        private readonly cloudinaryRepository: CloudinaryRepositoryOrm,
    ) {
    }

    async execute(userId: number, param: UpdateProfileParamDto) {
        const {birthday, fullName, phoneNumber, email, avatarId} = param;
        let avatar: CloudinaryEntity
        var user = await this.userRepository.findOneById(userId);
        if (!user) throw new BadRequestException('USER001USER001', ErrorCode.USER001);
        if (avatarId && avatarId > 0) {
            avatar = await this.cloudinaryRepository.findOneById(avatarId);
        }

        user.birthday = birthday ?? user.birthday;
        user.email = email ?? user.email;
        user.phoneNumber = phoneNumber ?? user.phoneNumber;
        user.fullName = fullName ?? user.fullName;
        user.avatar = avatar ?? user.avatar;

        var result = await this.userRepository.update(user);
        if(!result) throw new BadRequestException('USER002', ErrorCode.USER002);
        return new UpdatedResultDto({
            id: userId,
            result,
        });
    }
}
