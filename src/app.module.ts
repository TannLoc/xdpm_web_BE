import {ResponseInterceptor} from '@Infrastructure/interceptor';
import {Module} from '@nestjs/common';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {AppController} from './app.controller';
import {RepositoryOrmModule} from '@Infrastructure/typeorm/postgres/imp-repository/postgres-repository.module';
import {EnvConfigurationModule} from '@Infrastructure/env-configuration';
import {ServiceModule} from '@Infrastructure/service/service.module';
import {AuthModule} from '@Presentation/auth/auth.module';
import {BrandModule} from '@Presentation/brand/brand.module';
import {PicklistModule} from '@Presentation/picklist/picklist.module';
import {ProductModule} from '@Presentation/product/product.module';
import {UploadModule} from '@Presentation/upload/upload.module';
import {ShipmentModule} from '@Presentation/shipment/shipment.module';
import {CartModule} from '@Presentation/cart/cart.module';
import {UserModule} from '@Presentation/user/user.module';
import {OrderModule} from '@Presentation/order/order.module';
import {DashboardModule} from "@Presentation/dashboard/dashboard.module";

@Module({
    imports: [EnvConfigurationModule, ServiceModule, AuthModule, BrandModule, CartModule, DashboardModule, OrderModule, PicklistModule, ProductModule, RepositoryOrmModule, ShipmentModule, UserModule, UploadModule],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
    ],
})
export class AppModule {
}
