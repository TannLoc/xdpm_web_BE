import {Injectable} from '@nestjs/common';
import {OrderRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {UpdatedResultDto} from '@Presentation/dto/result';
import {ErrorCode, OrderState} from '@Domain/constants';
import {ActionOrderParamDto} from "@Presentation/order/dto/param";
import {BadRequestException} from "@Infrastructure/exception";

@Injectable()
export class ActionOrderUsecase {
    constructor(
        private readonly orderRepository: OrderRepositoryOrm,
    ) {
    }

    async execute(orderId: number, param: ActionOrderParamDto) {
        const {state: nextState} = param;
        const order = await this.orderRepository.findDetailOneById(orderId);
        if(!order) throw  new BadRequestException('ORDER002', ErrorCode.ORDER002);

        const stateTransitions = {
            [OrderState.WAITING_CONFIRM]: [OrderState.CONFIRMED, OrderState.CANCELED],
            [OrderState.CONFIRMED]: [OrderState.DELIVERING],
            [OrderState.DELIVERING]: [OrderState.RECEIVED],
            [OrderState.RECEIVED]: [OrderState.RETURNED]
        };

        const allowedTransitions = stateTransitions[order.state] || [];
        if (!allowedTransitions.includes(nextState)) throw  new BadRequestException('ORDER003', ErrorCode.ORDER003);

        const shouldUpdateInventory = [OrderState.CANCELED, OrderState.RETURNED].includes(nextState);

        if (shouldUpdateInventory) {
            let orderItems = order.items
            orderItems.map(  (item)=>{
                let intentory = item.product.inventory;
                intentory.stock += item.quantity;
                intentory.sold -= item.quantity;
            })
        }
        order.state = nextState;
        const result = await this.orderRepository.updateOne(order);
        if(!result) throw  new BadRequestException('ORDER004', ErrorCode.ORDER004);
        return new UpdatedResultDto({id: orderId});
    }
}