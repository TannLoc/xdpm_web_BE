import {BrandMapper} from '@Infrastructure/service/mapper/brand';
import {BrandRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {BrandFilterDtoParam} from '@Presentation/brand/dto/param';
import {BrandResultDto} from '@Presentation/brand/dto/result';
import {PaginationResult} from '@Presentation/dto/result';

@Injectable()
export class FindBrandsUseCase {
    constructor(
        private readonly brandRepository: BrandRepositoryOrm,
        private readonly productBrandMapper: BrandMapper,
    ) {
    }

    async execute(param: BrandFilterDtoParam) {
        const {page, pageSize} = param;
        var [data, total] = await this.brandRepository.findAllByFilter(param);

        var dateReturn = data.map((item) => this.productBrandMapper.toBrandResultDto(item));

        return new PaginationResult<BrandResultDto>({
            data: dateReturn,
            total,
            page,
            pageSize,
        });
    }
}
