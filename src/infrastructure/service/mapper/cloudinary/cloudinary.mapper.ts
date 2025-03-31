import {CloudinaryEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {CloudinaryResultDto} from '@Presentation/upload/dto/result';

@Injectable()
export class CloudinaryMapper {
    toCloudinaryResultDto(param: CloudinaryEntity): CloudinaryResultDto {
        var dto = new CloudinaryResultDto();
        dto.id = param.id;
        dto.url = param.url;

        return dto;
    }
}
