import {Injectable} from '@nestjs/common';
import {OrderRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {UpdateOrderParamDto} from '@Presentation/order/dto/param';
import {UpdatedResultDto} from '@Presentation/dto/result';
import {ErrorCode, OrderState} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';

@Injectable()
export class UpdateOrderUsecase {
    constructor(
        private readonly orderRepository: OrderRepositoryOrm,
    ) {
    }

    async execute(orderId: number, param: UpdateOrderParamDto) {
        const {note, district,ward,text,city} = param;
        var order =  await this.orderRepository.findDetailOneById(orderId);
        if(!order) throw  new BadRequestException('ORDER002', ErrorCode.ORDER002);

        if (order.state == OrderState.CONFIRMED ||
            order.state == OrderState.CANCELED ||
            order.state == OrderState.RETURNED ||
            order.state == OrderState.DELIVERING ||
            order.state == OrderState.RECEIVED)
            throw new BadRequestException("ORDER009", ErrorCode.ORDER009);
    let delivery = order.delivery;
        delivery.text = text
        delivery.city = city
        delivery.district = district
        delivery.ward = ward
        delivery.note = note

        var result = await this.orderRepository.updateOne(order);
        if(!result)throw  new BadRequestException('ORDER004', ErrorCode.ORDER004);
        return new UpdatedResultDto({
            id: orderId,
            result,
        });
    }
}
