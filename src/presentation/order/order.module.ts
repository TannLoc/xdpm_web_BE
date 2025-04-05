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
import { VnpayModule } from '@Infrastructure/service/vnpay/vnpay.module';
import { EnvConfigurationModule, EnvConfigurationService } from '@Infrastructure/env-configuration';
import { ignoreLogger } from 'vnpay';
import { UpdatePaymentStateOrderUsecase } from '@Application/usecases/order/update-payment-status.usecase';

@Module({
    imports: [
        VnpayModule.registerAsync({
            imports: [EnvConfigurationModule],
            useFactory: async (configService: EnvConfigurationService) => ({
                secureSecret: configService.getVNPSecureSecret(),
                tmnCode: configService.getVNPtmnCode(),
                vnpayHost: 'https://sandbox.vnpayment.vn',
                loggerFn: ignoreLogger,
            }),
            inject: [EnvConfigurationService],
        }),
    ],
    controllers: [OrderController, OrderManagementController],
    providers: [UpdatePaymentStateOrderUsecase,CreateOrderUsecase, ActionOrderCustomerUsecase, FindOneOrderUsecase, FindOrdersByUserIdUsecase, ActionOrderUsecase, FindOrdersUsecase, FindOneOrderUsecase, UpdateOrderUsecase],
})
export class OrderModule {
}
