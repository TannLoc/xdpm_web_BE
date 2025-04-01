import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {CartRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {UpdateCartParamDto} from '@Presentation/cart/dto/param';
import {UpdatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class UpdateCartUseCase {
    constructor(private readonly cartRepositoryOrm: CartRepositoryOrm) {
    }

    async execute(id: number, param: UpdateCartParamDto) {
        const {quantity} = param;

        let cart = await this.cartRepositoryOrm.findOneById(id);

        if (!cart) throw new BadRequestException('CART006', ErrorCode.CART006);

        cart.quantity = quantity;
        const result = await this.cartRepositoryOrm.updateOne(cart);
        return new UpdatedResultDto({
            id: cart.id,
            result,
        });
    }
}
