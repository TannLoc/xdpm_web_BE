import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {BrandMapper} from '@Infrastructure/service/mapper/brand';
import {BrandRepositoryOrm, CloudinaryRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {UpdateBrandParamDto} from '@Presentation/brand/dto/param';
import {UpdatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class UpdateBrandUseCase {
    constructor(
        private readonly brandRepository: BrandRepositoryOrm,
        private readonly productBrandMapper: BrandMapper,
        private readonly cloudinaryRepositoryOrm: CloudinaryRepositoryOrm,
    ) {
    }

    async execute(id: number, param: UpdateBrandParamDto){
        const {name,imageId} = param
        let brand = await this.brandRepository.findOneById(id);
        if (!brand) throw new BadRequestException('BRAND003', ErrorCode.BRAND003);
        const image =imageId ? await this.cloudinaryRepositoryOrm.findOneById(imageId) : brand.image;
        if (imageId && !image) throw new BadRequestException('BRAND001', ErrorCode.BRAND001);

        brand.image = image;
        brand.name = name;

        const result = await this.brandRepository.updateOne(brand);
        if (!result) throw new BadRequestException('BRAND005', ErrorCode.BRAND005);

        return new UpdatedResultDto({
            id,
            result,
        });
    }
}
