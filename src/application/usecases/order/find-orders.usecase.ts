import {Injectable} from '@nestjs/common';
import {OrderRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {OrderFilterDtoParam} from '@Presentation/order/dto/param';
import {PaginationResult} from '@Presentation/dto/result';
import {OrderEntity} from '@Domain/entity';

@Injectable()
export class FindOrdersUsecase {
    constructor(private readonly orderRepository: OrderRepositoryOrm) {
    }

    async execute(param: OrderFilterDtoParam) {
        const {page, pageSize} = param;
        var [data, total] = await this.orderRepository.findAllByFilter(null, null, param);
        return new PaginationResult<OrderEntity>({
            data: data,
            total,
            page,
            pageSize,
        });
    }
}
