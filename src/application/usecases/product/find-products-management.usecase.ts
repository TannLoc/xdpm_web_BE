import {ProductMapper} from '@Infrastructure/service/mapper/product';
import {ProductRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {PaginationResult} from '@Presentation/dto/result';
import {ProductFilterDtoParam} from '@Presentation/product/dto/param';
import {ItemProductResultDto} from '@Presentation/product/dto/result';

@Injectable()
export class FindProductsManagementUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryOrm,
        private readonly productMapper: ProductMapper,
    ) {
    }

    async execute(param: ProductFilterDtoParam){
        const {page, pageSize} = param;
        var [data, total] = await this.productRepository.findAllByFilter(param);
        var dataReturn = data.map( (item) =>
             this.productMapper.toItemProductResultDto(item)
        )
        return new PaginationResult<ItemProductResultDto>({
            data: dataReturn,
            total,
            page,
            pageSize,
        });
    }
}
