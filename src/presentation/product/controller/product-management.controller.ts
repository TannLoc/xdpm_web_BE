import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';

//Application
import {
    CreateProductUseCase,
    FindOneProductUseCase,
    FindProductsManagementUseCase,
    SetActiveProductUseCase,
    UpdateProductUseCase
} from '@Application/usecases/product';

//Domain
import {GENERIC_PATH, PRODUCTS_ROUTERS, UserRole} from '@Domain/constants';
import {AuthGuard} from '@Domain/guards';

//Infrastructure
import {ApiResponse, PaginationResponse, Roles} from '@Infrastructure/decorator';

//Dto
import {
    CreateProductParamDto,
    ProductFilterDtoParam,
    SetActiveProductParamDto,
    UpdateProductParamDto
} from '../dto/param';
import {ItemProductResultDto, ProductResultDto} from '../dto/result';
import {CreatedResultDto, PaginationResult, UpdatedResultDto} from '@Presentation/dto/result';

@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
@ApiTags('Product Management Controller')
@Controller(`${GENERIC_PATH.MANAGEMENT}/${PRODUCTS_ROUTERS.CONTROLLER}`)
export class ProductManagementController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly findProductsUseCase: FindProductsManagementUseCase,
        private readonly setActiveProductUseCase: SetActiveProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly findOneProductUseCase: FindOneProductUseCase,
    ) {
    }

    //Create Product
    @Post(PRODUCTS_ROUTERS.CREATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: CreatedResultDto, isPaginated: true})
    async create(@Body() param: CreateProductParamDto): Promise<CreatedResultDto> {
        const result = await this.createProductUseCase.execute(param);
        return result;
    }

    //Find All Product
    @Get(PRODUCTS_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    @ApiResponse({type: ItemProductResultDto, isPaginated: true})
    async find(@Query() param: ProductFilterDtoParam): Promise<PaginationResult<ItemProductResultDto>> {
        const result = await this.findProductsUseCase.execute(param);
        return result;
    }

    //Update Product
    @Put(PRODUCTS_ROUTERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiResponse({type: UpdatedResultDto})
    async update(@Param('id') id: number, @Body() param: UpdateProductParamDto): Promise<UpdatedResultDto> {
        const result = await this.updateProductUseCase.execute(id, param);
        return result;
    }

    //Set Active Product
    @Put(PRODUCTS_ROUTERS.SET_ACTIVE)
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiResponse({type: UpdatedResultDto})
    async setActive(@Param('id') id: number, @Body() param: SetActiveProductParamDto): Promise<UpdatedResultDto> {
        const result = await this.setActiveProductUseCase.execute(id, param);
        return result;
    }

    //Find One Product
    @Get(PRODUCTS_ROUTERS.FIND_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: ProductResultDto})
    async findOneById(@Param('id') id: number): Promise<ProductResultDto> {
        const result = await this.findOneProductUseCase.execute(id);
        return result;
    }
}
