import {BrandEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BrandFilterDtoParam} from '@Presentation/brand/dto/param';
import {isEmpty} from 'class-validator';
import {FindOptionsWhere, ILike, Repository} from 'typeorm';

@Injectable()
export class BrandRepositoryOrm {
    constructor(
        @InjectRepository(BrandEntity)
        private readonly repository: Repository<BrandEntity>,
    ) {
    }

    async create(param: BrandEntity): Promise<BrandEntity> {
        return await this.repository.save(param);
    }

    async findOneById(id: number): Promise<BrandEntity> {
        return await this.repository.findOne({
            where: {
                id,
            },
        });
    }

    async updateOne(param: BrandEntity): Promise<boolean> {
        var result = await this.repository.update(param.id, param);
        return result.affected !== null && result.affected > 0;
    }

    async countTotalBrand(): Promise<number> {
        return await this.repository.count()
    }

    async deleteOneById(id: number): Promise<boolean> {
        var result = await this.repository.softDelete(id);
        return result.affected !== null && result.affected > 0;
    }

    async findAllByFilter(filter: BrandFilterDtoParam): Promise<[BrandEntity[], number]> {
        const {keyword, orderBy, skip, sortOrder, isActive, pageSize} = filter;
        const condition: FindOptionsWhere<BrandEntity> | FindOptionsWhere<BrandEntity>[] = {
            ...(!isEmpty(keyword) ? {name: ILike(`%${keyword}%`)} : {}),
        };
        return await this.repository.findAndCount({
            where: condition,
            skip: skip,
            take: pageSize,
            order: {[orderBy]: sortOrder},
        });
    }
}
