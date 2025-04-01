import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';

//Application
import {
    AddProductToCartUseCase,
    DeleteCartUseCase,
    FindCartsUseCase,
    UpdateCartUseCase
} from '@Application/usecases/cart';

//Domain
import {CARTS_ROUTERS, UserRole} from '@Domain/constants';
import {AuthGuard} from '@Domain/guards';

//Infrastructure
import {ApiResponse, PaginationResponse, Roles} from '@Infrastructure/decorator';

//Dto
import {AddProductToCartParamDto, FindCartsParamDto, UpdateCartParamDto} from '../dto/param';
import {CartResultDto} from '../dto/result';
import {DeletedResultDto, UpdatedResultDto} from '@Presentation/dto/result';

@UseGuards(AuthGuard)
@Roles(UserRole.CUSTOMER)
@ApiTags('Cart Controller')
@Controller(`${CARTS_ROUTERS.CONTROLLER}`)
export class CartController {
    constructor(
        private readonly addProductToCartUseCase: AddProductToCartUseCase,
        private readonly findCartUseCase: FindCartsUseCase,
        private readonly updateCartUseCase: UpdateCartUseCase,
        private readonly deleteCartUseCase: DeleteCartUseCase,
    ) {
    }

    @Post(CARTS_ROUTERS.CREATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: UpdatedResultDto})
    async add(@Body() param: AddProductToCartParamDto, @Req() request: Request) {
        var payload = request['payload'];
        const result = await this.addProductToCartUseCase.execute(payload.userId, param);
        return result;
    }

    @Get(CARTS_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: CartResultDto, isPaginated: true})
    @PaginationResponse()
    async find(@Query() param: FindCartsParamDto, @Req() request: Request) {
        var payload = request['payload'];
        const result = await this.findCartUseCase.execute(payload.userId, param);
        return result;
    }

    @Put(CARTS_ROUTERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiResponse({type: UpdatedResultDto})
    async update(@Body() param: UpdateCartParamDto, @Param('id') id: number){
        const result = await this.updateCartUseCase.execute(id, param);
        return result;
    }

    @Delete(CARTS_ROUTERS.DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: DeletedResultDto})
    async delete(@Param('id') id: number){
        const result = await this.deleteCartUseCase.execute(id);
        return result;
    }
}
