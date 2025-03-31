import {BrandEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {BrandResultDto} from '@Presentation/brand/dto/result';
import {CloudinaryMapper} from '../cloudinary';

@Injectable()
export class BrandMapper {
    constructor(private readonly cloudinaryMapper: CloudinaryMapper) {
    }

    toBrandResultDto(param: BrandEntity): BrandResultDto {
        var dto = new BrandResultDto();
        dto.id = param.id;
        dto.name = param.name;
        dto.image = param.image != null ? this.cloudinaryMapper.toCloudinaryResultDto(param.image) : null;
        dto.createdAt = param.createdAt;
        dto.updatedAt = param.updatedAt;
        return dto;
    }
}
