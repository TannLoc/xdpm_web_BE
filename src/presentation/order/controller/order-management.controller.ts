import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {GENERIC_PATH, ORDERS_ROUTERS, UserRole} from '@Domain/constants';
import {ApiTags} from '@nestjs/swagger';
import {ApiResponse, PaginationResponse, Roles} from '@Infrastructure/decorator';
import {
    ActionOrderUsecase,
    CreateOrderUsecase,
    FindOneOrderUsecase,
    FindOrdersUsecase,
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
import {CreatedResultDto, UpdatedResultDto} from '@Presentation/dto/result';

@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
@ApiTags('Order Management Controller')
@Controller(`${GENERIC_PATH.MANAGEMENT}/${ORDERS_ROUTERS.CONTROLLER}`)
export class OrderManagementController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUsecase,
        private readonly findOrdersUsecase: FindOrdersUsecase,
        private readonly findOneOrderUsecase: FindOneOrderUsecase,
        private readonly updateOrderUsecase: UpdateOrderUsecase,
        private readonly actionOrderUsecase: ActionOrderUsecase
    ) {
    }

    @Post(ORDERS_ROUTERS.CREATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: CreatedResultDto})
    async add(@Body() param: CreateOrderParamDto, @Req() request: Request) {
        const result = await this.createOrderUseCase.execute(param.customerId, param);
        return result;
    }

    @Get(ORDERS_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    @ApiResponse({type: OrderEntity, isPaginated: true})
    async find(@Query() param: OrderFilterDtoParam) {
        const result = await this.findOrdersUsecase.execute(param);
        return result;
    }

    @Get(ORDERS_ROUTERS.FIND_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: OrderEntity})
    async findOne(@Param('id') id: number) {
        const result = await this.findOneOrderUsecase.execute(id);
        return result;
    }

    @Put(ORDERS_ROUTERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: UpdatedResultDto})
    async update(@Param('id') id: number, @Body() param: UpdateOrderParamDto): Promise<any> {
        const result = await this.updateOrderUsecase.execute(id, param);
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
