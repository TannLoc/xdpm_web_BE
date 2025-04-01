import {Module} from '@nestjs/common';
import {ProductController, ProductManagementController} from './controller';
import {
    CreateProductUseCase,
    FindOneProductUseCase,
    FindProductsManagementUseCase,
    FindProductUseCase,
    SetActiveProductUseCase,
    UpdateProductUseCase
} from '@Application/usecases/product';

@Module({
    imports: [],
    controllers: [ProductController, ProductManagementController],
    providers: [CreateProductUseCase, UpdateProductUseCase, FindProductsManagementUseCase, FindProductUseCase, SetActiveProductUseCase, FindOneProductUseCase],
})
export class ProductModule {
}
