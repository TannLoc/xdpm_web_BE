import {Controller, Get, HttpCode, HttpStatus, Param, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

//Application
import {FindOneProductUseCase, FindProductUseCase} from '@Application/usecases/product';

//Domain
import {PRODUCTS_ROUTERS} from '@Domain/constants';

//Infrastructure
import {ApiResponse, PaginationResponse} from '@Infrastructure/decorator';

//Dto
import {ProductFilterDtoParam} from '../dto/param';
import {ItemViewProductResultDto, ProductResultDto} from '../dto/result';
import {PaginationResult} from '@Presentation/dto/result';

@ApiTags('Product Controller')
@Controller(`${PRODUCTS_ROUTERS.CONTROLLER}`)
export class ProductController {
    constructor(
        private readonly findProductsUseCase: FindProductUseCase,
        private readonly findOneProductUseCase: FindOneProductUseCase,
    ) {
    }

    //Find All Product
    @Get(PRODUCTS_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    @ApiResponse({type: ItemViewProductResultDto, isPaginated: true})
    async find(@Query() param: ProductFilterDtoParam): Promise<PaginationResult<ItemViewProductResultDto>> {
        const result = await this.findProductsUseCase.execute(param);
        return result;
    }

    //Find One Product
    @Get(PRODUCTS_ROUTERS.FIND_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: ItemViewProductResultDto, isPaginated: true})
    async findOne(@Param('id') id: number): Promise<ProductResultDto> {
        const result = await this.findOneProductUseCase.execute(id);
        return result;
    }
}
