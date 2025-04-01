import {ErrorCode} from '@Domain/constants';
import {ProductMapper} from '@Infrastructure/service/mapper/product';
import {InventoryRepositoryOrm, ProductRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {BadRequestException, Injectable} from '@nestjs/common';
import {ProductResultDto} from '@Presentation/product/dto/result';

@Injectable()
export class FindOneProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryOrm,
        private readonly productMapper: ProductMapper,
        private readonly productInventoryRepositoryOrm: InventoryRepositoryOrm,
    ) {
    }

    async execute(id: number): Promise<ProductResultDto> {
        var product = await this.productRepository.findDetailOneById(id);
        if (!product) throw new BadRequestException('PROD001', ErrorCode.PROD001);
        var dataReturn =  this.productMapper.toProductResultDto(product);
        return dataReturn;
    }
}
