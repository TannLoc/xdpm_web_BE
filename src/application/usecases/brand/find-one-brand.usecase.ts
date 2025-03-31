import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {BrandMapper} from '@Infrastructure/service/mapper/brand';
import {BrandRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';

@Injectable()
export class FindOneBrandUseCase {
    constructor(
        private readonly brandRepository: BrandRepositoryOrm,
        private readonly productBrandMapper: BrandMapper,
    ) {
    }

    async execute(id: number) {
        var brand = await this.brandRepository.findOneById(id);
        if (!brand) throw new BadRequestException('BRAND003', ErrorCode.BRAND003);
        var result = this.productBrandMapper.toBrandResultDto(brand);
        return result;
    }
}
