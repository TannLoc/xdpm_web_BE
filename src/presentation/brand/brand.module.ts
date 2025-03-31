import {Module} from '@nestjs/common';
import {BrandController, BrandManagementController} from './controller';
import {
    CreateBrandUseCase,
    DeleteBrandUseCase,
    FindBrandsUseCase,
    FindOneBrandUseCase,
    UpdateBrandUseCase
} from '@Application/usecases/brand';

@Module({
    imports: [],
    controllers: [BrandController, BrandManagementController],
    providers: [CreateBrandUseCase, UpdateBrandUseCase, FindBrandsUseCase, DeleteBrandUseCase, FindOneBrandUseCase],
})
export class BrandModule {
}
