import {InventoryEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';

@Injectable()
export class InventoryRepositoryOrm {
    constructor(
        @InjectRepository(InventoryEntity)
        private readonly repository: Repository<InventoryEntity>,
    ) {
    }

    async create(param: Partial<InventoryEntity>): Promise<InventoryEntity> {
        return await this.repository.save(param);
    }

    async findOneById(id: number): Promise<InventoryEntity> {
        return await this.repository.findOne({
            where: {
                id,
            },
        });
    }

    async sumTotalImport(): Promise<number> {
        return await this.repository.sum("import")
    }

    async sumTotalStock(): Promise<number> {
        return await this.repository.sum("stock")
    }

    async sumTotalSold(): Promise<number> {
        return await this.repository.sum("sold")
    }

    async findOneByProductId(productId: number): Promise<InventoryEntity> {
        return await this.repository.findOne({
            where: {
                product: {
                    id: productId,
                },
            },
        });
    }
    async findAllByProductIds(productIds: number[]): Promise<InventoryEntity[]> {
        return await this.repository.find({
            where: {
                product: {
                    id: In(productIds),
                },
            },
        });
    }

    async updateOne(param: InventoryEntity): Promise<boolean> {
        var result = await this.repository.update(param.id, param);
        return result.affected !== null && result.affected > 0;
    }
}
