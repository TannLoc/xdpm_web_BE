import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {BrandRepositoryOrm, ProductRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {DeletedResultDto} from '@Presentation/dto/result';

@Injectable()
export class DeleteBrandUseCase {
    constructor(private readonly brandRepository: BrandRepositoryOrm,
                private readonly productRepository: ProductRepositoryOrm
    ) {
    }

    async execute(id: number) {
        const brand = await this.brandRepository.findOneById(id);
        if (!brand) throw new BadRequestException('BRAND003', ErrorCode.BRAND003);
        var checkProductInBrand = await this.productRepository.countByBrandId(id);
        if (checkProductInBrand > 0 ) throw new BadRequestException('BRAND004', ErrorCode.BRAND004);
        var result = await this.brandRepository.deleteOneById(id);
        return new DeletedResultDto({
            id,
            result,
        });
    }
}
