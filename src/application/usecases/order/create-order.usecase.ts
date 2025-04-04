import {CreatedResultDto} from '@Presentation/dto/result';
import {
    CartRepositoryOrm,
    InventoryRepositoryOrm,
    OrderRepositoryOrm,
    UserRepositoryOrm,
} from '@Infrastructure/typeorm/postgres/imp-repository';
import {CreateOrderParamDto} from '@Presentation/order/dto/param';
import {BadRequestException} from '@Infrastructure/exception';
import {DeliveryEntity, OrderEntity, OrderItemEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {ErrorCode} from "@Domain/constants";

@Injectable()
export class CreateOrderUsecase {
    constructor(
        private readonly userRepository: UserRepositoryOrm,
        private readonly inventoryRepository: InventoryRepositoryOrm,
        private readonly orderRepository: OrderRepositoryOrm,
        private readonly cartRepository: CartRepositoryOrm,
    ) {
    }

    async execute(userId: number, param: CreateOrderParamDto) {
        const {cartIds, delivery} = param;
        var cartsEntity = await this.cartRepository.findAllByIds(cartIds)
        let totalQuantity: number = 0,
            totalBill: number = 0,
            error: string[] = [],
            deliveryEntity: DeliveryEntity;

        let user = await this.userRepository.findOneById(userId);
        if (!user) throw new BadRequestException('ORDER005', ErrorCode.ORDER005)


            cartsEntity.map((item) => {
                const {product, quantity} = item;
                if (product.inventory.stock < quantity) error.push(`${product.code} is out of stock`);
            })

        if (error && error.length > 0) throw new BadRequestException('ORDER008', error);

        const orderItems =
            cartsEntity.map( ({ product, quantity }) => {
                return new OrderItemEntity({
                        quantity,
                        product,
                        salePrice: product.salesPrice,
                    })

            })


            orderItems.map(async (item) => {
                var inventory = item.product.inventory

                 inventory.stock -= item.quantity;
                 inventory.sold += item.quantity;
                totalQuantity += item.quantity;
                totalBill += item.salePrice * item.quantity;
                return item;
            })

        deliveryEntity =
            new DeliveryEntity({
                note: delivery.note,
                city: delivery.city,
                district: delivery.district,
                ward: delivery.ward,
                text: delivery.text,
            })

        const entity = new OrderEntity({
            customer: user,
            code: this.generateUniqueCode(),
            delivery: deliveryEntity,
            items: orderItems,
            totalQuantity: totalQuantity,
            totalBill: totalBill,
        });
        const result = await this.orderRepository.create(entity);
         await this.cartRepository.deleteByIds(cartIds);
        if(!result) throw new BadRequestException('ORDER001', ErrorCode.ORDER001);
        return new CreatedResultDto({id: result.id});
    }

    private generateUniqueCode(length: number = 10): string {
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code: string;
        code = Array.from({length}, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        return code;
    }
}
