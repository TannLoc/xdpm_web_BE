import {Injectable} from '@nestjs/common';
import {OrderItemRepositoryOrm, OrderRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {UpdatedResultDto} from '@Presentation/dto/result';
import {ErrorCode, OrderState} from '@Domain/constants';
import {ActionOrderParamDto} from "@Presentation/order/dto/param";
import {BadRequestException} from "@Infrastructure/exception";

@Injectable()
export class ActionOrderCustomerUsecase {
    constructor(
        private readonly orderRepository: OrderRepositoryOrm,
        private readonly orderItemRepository: OrderItemRepositoryOrm,
    ) {
    }

    async execute(orderId: number, param: ActionOrderParamDto): Promise<UpdatedResultDto> {
        const {state: nextState} = param;
        const order = await this.orderRepository.findDetailOneById(orderId);
        if(!order) throw  new BadRequestException('ORDER002', ErrorCode.ORDER002);
        if (nextState != OrderState.RECEIVED && nextState != OrderState.CANCELED && nextState != OrderState.RETURNED)
            throw new BadRequestException('ORDER003', ErrorCode.ORDER003);

        const stateTransitions = {
            [OrderState.WAITING_CONFIRM]: [OrderState.CANCELED],
            [OrderState.DELIVERING]: [OrderState.RECEIVED],
            [OrderState.RECEIVED]: [OrderState.RETURNED]
        };

        const allowedTransitions = stateTransitions[order.state] || [];
        if (!allowedTransitions.includes(nextState)) throw  new BadRequestException('ORDER003', ErrorCode.ORDER003);

        const shouldUpdateInventory = [OrderState.CANCELED, OrderState.RECEIVED, OrderState.RETURNED].includes(nextState);
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