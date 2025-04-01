import {ErrorCode} from '@Domain/constants';
import {CartEntity} from '@Domain/entity';
import {BadRequestException} from '@Infrastructure/exception';
import {
    CartRepositoryOrm,
    ProductRepositoryOrm,
    UserRepositoryOrm
} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {AddProductToCartParamDto} from '@Presentation/cart/dto/param';
import {CreatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class AddProductToCartUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryOrm,
        private readonly cartRepositoryOrm: CartRepositoryOrm,
        private readonly userRepositoryOrm: UserRepositoryOrm,
    ) {
    }

    async execute(userId: number, param: AddProductToCartParamDto) {
        const {productId} = param;
        const user = await this.userRepositoryOrm.findOneById(userId);
        if (!user) throw new BadRequestException('CART001', ErrorCode.CART001);

        const product = await this.productRepository.findOneById(productId);
        if (!product) throw new BadRequestException('CART002', ErrorCode.CART002);

        let cart = await this.cartRepositoryOrm.findOneByUserIdAndProductId(userId, productId);
        if (cart) {
            cart.quantity += 1;
            const result = await this.cartRepositoryOrm.updateOne(cart);
            throw new BadRequestException('CART003', ErrorCode.CART003);
        }

        const newCart = new CartEntity({
            customer: user,
            product: product,
            quantity: 1,
        });

        const result = await this.cartRepositoryOrm.create(newCart);
        if (!result) throw new BadRequestException('CART004', ErrorCode.CART004);

        return new CreatedResultDto({
            id: result.id,
        });
    }
}
