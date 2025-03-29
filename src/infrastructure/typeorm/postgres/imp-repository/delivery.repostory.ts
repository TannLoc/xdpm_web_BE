import {DeliveryEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class DeliveryRepositoryOrm {
    constructor(
        @InjectRepository(DeliveryEntity)
        private readonly repository: Repository<DeliveryEntity>,
    ) {
    }

    async updateOne(param: DeliveryEntity): Promise<boolean> {
        var result = await this.repository.save(param);
        return result != null;
    }

    async findOneById(id: number): Promise<any> {
        var result = await this.repository.findOne({
            where: {
                id
            }
        });
        return result != null;
    }

    async create(param: DeliveryEntity): Promise<DeliveryEntity> {
        return await this.repository.save(param);
    }

}
