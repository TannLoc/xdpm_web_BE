import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {CartRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {DeletedResultDto} from '@Presentation/dto/result';

@Injectable()
export class DeleteCartUseCase {
    constructor(private readonly cartRepositoryOrm: CartRepositoryOrm) {
    }

    async execute(id: number): Promise<DeletedResultDto> {
        const cart = await this.cartRepositoryOrm.findOneById(id);
        if (!cart) throw new BadRequestException('CART005', ErrorCode.CART005);

        const result = await this.cartRepositoryOrm.deleteOneById(id);
        if (!result) throw new BadRequestException('CART006', ErrorCode.CART006);

            return new DeletedResultDto({
                id,
                result,
            });
    }
}
