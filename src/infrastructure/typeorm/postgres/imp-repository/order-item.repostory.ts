import {OrderItemEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class OrderItemRepositoryOrm {
    constructor(
        @InjectRepository(OrderItemEntity)
        private readonly repository: Repository<OrderItemEntity>,
    ) {
    }

    async create(param: OrderItemEntity): Promise<OrderItemEntity> {
        return await this.repository.save(param);
    }

    async findAllByOrderId(orderId: number): Promise<OrderItemEntity[]> {
        return await this.repository.find({
            where: {
                order: {
                    id: orderId
                }
            }
        })
    }
    async findOneById(id: number): Promise<OrderItemEntity | null> {
        return await this.repository.findOne({
            where: {
                id,
            },
        });
    }
    async updateOne(param: OrderItemEntity): Promise<boolean> {
        var result = await this.repository.update(param.id, param);
        return result.affected !== null && result.affected > 0;
    }
}
