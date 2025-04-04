import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {ORDERS_ROUTERS, UserRole} from '@Domain/constants';
import {ApiTags} from '@nestjs/swagger';
import {ApiResponse, PaginationResponse, Roles} from '@Infrastructure/decorator';
import {CreatedResultDto, UpdatedResultDto} from '@Presentation/dto/result';
import {
    CreateOrderUsecase,
    FindOneOrderUsecase,
    FindOrdersByUserIdUsecase,
    UpdateOrderUsecase,
} from '@Application/usecases/order';
import {
    ActionOrderParamDto,
    CreateOrderParamDto,
    OrderFilterDtoParam,
    UpdateOrderParamDto,
} from '@Presentation/order/dto/param';
import {AuthGuard} from '@Domain/guards';
import {OrderEntity} from '@Domain/entity';
import {ActionOrderCustomerUsecase} from "@Application/usecases/order/action-order-customer.usecase";

@UseGuards(AuthGuard)
@Roles(UserRole.CUSTOMER)
@ApiTags('Order Controller')
@Controller(ORDERS_ROUTERS.CONTROLLER)
export class OrderController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUsecase,
        private readonly findOrderByUserIdUsecase: FindOrdersByUserIdUsecase,
        private readonly findOneOrderUsecase: FindOneOrderUsecase,
        private readonly updateOrderUsecase: UpdateOrderUsecase,
        private readonly actionOrderUsecase: ActionOrderCustomerUsecase
    ) {
    }

    @Post(ORDERS_ROUTERS.CREATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: CreatedResultDto})
    async add(@Body() param: CreateOrderParamDto, @Req() request: Request) {
        var payload = request['payload'];
        const result = await this.createOrderUseCase.execute(payload.userId, param);
        return result;
    }

    @Get(ORDERS_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    @ApiResponse({type: OrderEntity, isPaginated: true})
    async findorders(@Query() param: OrderFilterDtoParam, @Req() request: Request) {
        var payload = request['payload'];
        const result = await this.findOrderByUserIdUsecase.execute(payload.userId, param);
        return result;
    }

    @Put(ORDERS_ROUTERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: UpdatedResultDto})
    async update(@Param('id') id: number, @Body() param: UpdateOrderParamDto, @Req() request: Request): Promise<any> {
        var payload = request['payload'];
        const result = await this.updateOrderUsecase.execute( id, param);
        return result;
    }

    @Get(ORDERS_ROUTERS.FIND_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: OrderEntity})
    async findOneOrder(@Param('id') id: number, @Req() request: Request) {
        const result = await this.findOneOrderUsecase.execute(id);
        return result;
    }

    @Put(ORDERS_ROUTERS.ACTION)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: UpdatedResultDto})
    async actionOrder(@Param('id') id: number, @Body() param: ActionOrderParamDto): Promise<any> {
        const result = await this.actionOrderUsecase.execute(id, param);
        return result;
    }
}
