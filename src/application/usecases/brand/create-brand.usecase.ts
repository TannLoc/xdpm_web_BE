import {ErrorCode} from '@Domain/constants';
import {BrandEntity} from '@Domain/entity';
import {BadRequestException} from '@Infrastructure/exception';
import {BrandRepositoryOrm, CloudinaryRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {CreateBrandParamDto} from '@Presentation/brand/dto/param';
import {CreatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class CreateBrandUseCase {
    constructor(
        private readonly brandRepository: BrandRepositoryOrm,
        private readonly cloudinaryRepositoryOrm: CloudinaryRepositoryOrm,
    ) {
    }

    async execute(param: CreateBrandParamDto) {
        const {name, imageId} = param;
        const image =imageId ? await this.cloudinaryRepositoryOrm.findOneById(imageId) : null;
        if (imageId && !image) throw new BadRequestException('BRAND001', ErrorCode.BRAND001);

        const newBrand = new BrandEntity({
            name: name,
            image: image,
        });

        const result = await this.brandRepository.create(newBrand);
        if (!result) throw new BadRequestException('BRAND002', ErrorCode.BRAND002);

        return new CreatedResultDto({
            id: result.id,
        });
    }
}
