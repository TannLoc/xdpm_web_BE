import {ErrorCode} from '@Domain/constants/error-code.constant';
import {CloudinaryEntity} from '@Domain/entity';
import {BadRequestException} from '@Infrastructure/exception';
import {CloudinaryService} from '@Infrastructure/service/cloudinary';
import {CloudinaryMapper} from '@Infrastructure/service/mapper/cloudinary';
import {CloudinaryRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {CloudinaryResultDto} from '@Presentation/upload/dto/result';

@Injectable()
export class UploadUseCase {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly cloudinaryRepository: CloudinaryRepositoryOrm,
        private readonly cloudinaryMapper: CloudinaryMapper,
    ) {
    }

    async execute(file: Express.Multer.File): Promise<CloudinaryResultDto> {
        if(!file) throw new  BadRequestException('UPLOAD002', ErrorCode.UPLOAD002);
        const upload = await this.cloudinaryService.upload(file);

        if (!upload) throw new BadRequestException('UPLOAD001', ErrorCode.UPLOAD001);

        const entity: CloudinaryEntity = new CloudinaryEntity({
            url: upload.url,
            bytes: upload.bytes,
            format: upload.format,
        });

        const result = await this.cloudinaryRepository.create(entity);

        if (!result) throw new BadRequestException('CLOUDINARY002', ErrorCode.CLOUDINARY002);

        const dataReturn = this.cloudinaryMapper.toCloudinaryResultDto(result);

        return dataReturn;
    }
}
