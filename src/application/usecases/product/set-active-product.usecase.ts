import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {ProductMapper} from '@Infrastructure/service/mapper/product';
import {ProductRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {UpdatedResultDto} from '@Presentation/dto/result';
import {SetActiveProductParamDto} from '@Presentation/product/dto/param';

@Injectable()
export class SetActiveProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryOrm,
        private readonly productMapper: ProductMapper,
    ) {
    }

    async execute(id: number, param: SetActiveProductParamDto): Promise<UpdatedResultDto> {
        var product = await this.productRepository.findOneById(id);
        if (!product) throw new BadRequestException('PROD001', ErrorCode.PROD001);

        var result = await this.productRepository.setActive(id, param.isActive);
        if (!result) throw new BadRequestException('PROD006', ErrorCode.PROD006);

        return new UpdatedResultDto({
            id,
            result,
        });
    }
}
