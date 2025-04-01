import {ProductMapper} from '@Infrastructure/service/mapper/product';
import {ProductRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {PaginationResult} from '@Presentation/dto/result';
import {ProductFilterDtoParam} from '@Presentation/product/dto/param';
import {ItemViewProductResultDto} from '@Presentation/product/dto/result';

@Injectable()
export class FindProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryOrm,
        private readonly productMapper: ProductMapper,
    ) {
    }

    async execute(param: ProductFilterDtoParam): Promise<PaginationResult<ItemViewProductResultDto>> {
        const {page, pageSize} = param;
        var [data, total] = await this.productRepository.findAllByFilter(param);
        var dateReturn =
            data.map( (item) => this.productMapper.toItemViewProductResultDto(item)
        );
        return new PaginationResult<ItemViewProductResultDto>({
            data: dateReturn,
            total,
            page,
            pageSize,
        });
    }
}
