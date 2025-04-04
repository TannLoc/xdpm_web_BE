import {Module} from '@nestjs/common';
import {OrderController} from './controller';
import {
    ActionOrderUsecase,
    CreateOrderUsecase,
    FindOrdersByUserIdUsecase,
    FindOrdersUsecase,
    UpdateOrderUsecase,
} from '@Application/usecases/order';
import {FindOneOrderUsecase} from '@Application/usecases/order/find-one-order.usecase';
import {OrderManagementController} from '@Presentation/order/controller/order-management.controller';
import {ActionOrderCustomerUsecase} from "@Application/usecases/order/action-order-customer.usecase";

@Module({
    imports: [],
    controllers: [OrderController, OrderManagementController],
    providers: [CreateOrderUsecase, ActionOrderCustomerUsecase, FindOneOrderUsecase, FindOrdersByUserIdUsecase, ActionOrderUsecase, FindOrdersUsecase, FindOneOrderUsecase, UpdateOrderUsecase],
})
export class OrderModule {
}
