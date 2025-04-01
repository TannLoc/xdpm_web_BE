import {Injectable} from '@nestjs/common';
import {UserEntity} from '@Domain/entity';
import {ProfileResultDto} from '@Presentation/user/dto/result';
import {CloudinaryMapper} from '@Infrastructure/service/mapper/cloudinary';

@Injectable()
export class UserMapper {
    constructor(
        private readonly cloudinaryMapper: CloudinaryMapper,
    ) {
    }

    toProfileResultDto(param: UserEntity): ProfileResultDto {
        var dto = new ProfileResultDto();
        dto.id = param.id;
        dto.birthday = param.birthday;
        dto.email = param.email;
        dto.role = param.role;
        dto.phoneNumber = param.phoneNumber;
        dto.fullName = param.fullName;
        dto.avatar = param.avatar ? this.cloudinaryMapper.toCloudinaryResultDto(param.avatar) : null;
        return dto;
    }
}
