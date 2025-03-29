import {OrderEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsWhere, Repository} from 'typeorm';
import {OrderFilterDtoParam} from '@Presentation/order/dto/param';
import {OrderState} from "@Domain/constants";

@Injectable()
export class OrderRepositoryOrm {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly repository: Repository<OrderEntity>,
    ) {
    }

    async create(param: OrderEntity): Promise<OrderEntity> {
        return await this.repository.save(param);
    }

    async findDetailOneById(id: number): Promise<OrderEntity | null> {
        return await this.repository.findOne({
            where: {
                id,
            },
            relations: {
                delivery: true,
                items: {
                    product:{
                        inventory:true
                    }
                }
            },
        });
    }
    async findOneById(id: number): Promise<OrderEntity | null> {
        return await this.repository.findOne({
            where: {
                id,
            }
        });
    }


    async updateOne(param: OrderEntity): Promise<boolean> {
        var result = await this.repository.save(param);
        return result != null;
    }

    async sumTotalBill(): Promise<number> {
        return await this.repository.sum("totalBill", {
            state: OrderState.RECEIVED
        })
    }

    async countByState(state: OrderState): Promise<number> {
        return await this.repository.count({
            where: {
                state: state
            }
        })
    }

    async findOneByUserIdAndOrderId(userId?: number, orderId?: number): Promise<OrderEntity | null> {
        const condition: FindOptionsWhere<OrderEntity> | FindOptionsWhere<OrderEntity>[] = {
            ...(userId ? {customer: {id: userId}} : {}),
            ...(orderId ? {id: orderId} : {}),
        };
        return await this.repository.findOne({
            where: condition,
            relations: {
                delivery:true
            },
        });
    }
    async findAllByFilter(userId: number, orderId: number, param: OrderFilterDtoParam): Promise<[OrderEntity[], number]> {
        const {skip, sortOrder, orderBy, pageSize} = param;
        const condition: FindOptionsWhere<OrderEntity> | FindOptionsWhere<OrderEntity>[] = {
            ...(userId ? {customer: {id: userId}} : {}),
            ...(orderId ? {id: orderId} : {}),
        };
        return await this.repository.findAndCount({
            where: condition,
            skip: skip,
            take: pageSize,
            order: {[orderBy]: sortOrder},
        });
    }
}
