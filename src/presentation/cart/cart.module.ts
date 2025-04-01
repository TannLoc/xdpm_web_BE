import {Module} from '@nestjs/common';
import {CartController} from './controller';
import {
    AddProductToCartUseCase,
    DeleteCartUseCase,
    FindCartsUseCase,
    UpdateCartUseCase
} from '@Application/usecases/cart';

@Module({
    imports: [],
    controllers: [CartController],
    providers: [AddProductToCartUseCase, FindCartsUseCase, UpdateCartUseCase, DeleteCartUseCase],
})
export class CartModule {
}
