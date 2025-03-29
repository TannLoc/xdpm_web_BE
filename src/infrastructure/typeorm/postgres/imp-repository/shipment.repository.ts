import {ShipmentEntity} from '@Domain/entity/shipment.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ShipmentFilterDtoParam} from '@Presentation/shipment/dto/param';
import {Repository} from 'typeorm';

@Injectable()
export class ShipmentRepositoryOrm {
    constructor(
        @InjectRepository(ShipmentEntity)
        private readonly repository: Repository<ShipmentEntity>,
    ) {
    }

    async create(param?: ShipmentEntity): Promise<ShipmentEntity> {
        return await this.repository.save(param);
    }

    async updateOne(param: ShipmentEntity): Promise<boolean> {
        var result = await this.repository.update(param.id, param);
        return result.affected !== null && result.affected > 0;
    }

    async findOneById(id: number): Promise<ShipmentEntity> {
        return await this.repository.findOne({
            where: {
                id,
            },
            relations: {
                inventory: {
                    product: true
                }
                
            },
        });
    }

    async findAllByFilter(param: ShipmentFilterDtoParam): Promise<[ShipmentEntity[], number]> {
        return await this.repository.findAndCount({
            relations: {
                inventory: {
                    product: true
                }
            },
            skip:param.skip,
            take:param.pageSize
        });
    }

    async deleteOneById(id: number): Promise<boolean> {
        var result = await this.repository.softDelete(id);
        return result.affected !== null && result.affected > 0;
    }
}
