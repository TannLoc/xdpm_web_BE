import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostgresModule} from '../configuration';
import {
    BrandEntity,
    CartEntity,
    CloudinaryEntity,
    DeliveryEntity,
    InventoryEntity,
    OrderEntity,
    OrderItemEntity,
    PaymentEntity,
    PicklistEntity,
    ProductEntity,
    ShipmentEntity,
    UserEntity,
} from '@Domain/entity';
import {
    BrandRepositoryOrm,
    CartRepositoryOrm,
    CloudinaryRepositoryOrm,
    DeliveryRepositoryOrm,
    InventoryRepositoryOrm,
    OrderItemRepositoryOrm,
    OrderRepositoryOrm,
    PaymentRepositoryOrm,
    PicklistRepositoryOrm,
    ProductRepositoryOrm,
    ShipmentRepositoryOrm,
    UserRepositoryOrm,
} from './index';

@Global()
@Module({
    imports: [
        PostgresModule,
        TypeOrmModule.forFeature([
            CloudinaryEntity,
            PicklistEntity,
            BrandEntity,
            ProductEntity,
            InventoryEntity,
            ShipmentEntity,
            UserEntity,
            OrderEntity,
            CartEntity,
            DeliveryEntity,
            OrderItemEntity,
            PaymentEntity
        ]),
    ],
    providers: [
        CloudinaryRepositoryOrm,
        PicklistRepositoryOrm,
        BrandRepositoryOrm,
        ProductRepositoryOrm,
        InventoryRepositoryOrm,
        ShipmentRepositoryOrm,
        UserRepositoryOrm,
        OrderRepositoryOrm,
        CartRepositoryOrm,
        DeliveryRepositoryOrm,
        OrderItemRepositoryOrm,
        PaymentRepositoryOrm
    ],
    exports: [
        CloudinaryRepositoryOrm,
        PicklistRepositoryOrm,
        BrandRepositoryOrm,
        ProductRepositoryOrm,
        InventoryRepositoryOrm,
        ShipmentRepositoryOrm,
        UserRepositoryOrm,
        OrderRepositoryOrm,
        CartRepositoryOrm,
        DeliveryRepositoryOrm,
        OrderItemRepositoryOrm,
        PaymentRepositoryOrm
    ],
})
export class RepositoryOrmModule {
}
