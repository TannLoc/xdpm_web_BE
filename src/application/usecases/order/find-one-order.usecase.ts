import {Injectable} from '@nestjs/common';
import {OrderRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';

@Injectable()
export class FindOneOrderUsecase {
    constructor(private readonly orderRepository: OrderRepositoryOrm) {
    }

    async execute(orderId: number) {
        var result = await this.orderRepository.findDetailOneById(orderId);
        return result;
    }
}
