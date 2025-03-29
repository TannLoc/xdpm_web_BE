import {PicklistEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PicklistFilterDtoParam} from '@Presentation/picklist/dto/param';
import {FindOptionsWhere, ILike, In, Repository} from 'typeorm';
import {isEmpty} from "class-validator";

@Injectable()
export class PicklistRepositoryOrm {
    constructor(
        @InjectRepository(PicklistEntity)
        private readonly repository: Repository<PicklistEntity>,
    ) {
    }

    async create(param: PicklistEntity): Promise<PicklistEntity> {
        return await this.repository.save(param);
    }

    async findAllByFilter(param: PicklistFilterDtoParam): Promise<[PicklistEntity[], number]> {
        const {skip, sortOrder, orderBy, pageSize,keyword,type,isActive} = param;
        const condition: FindOptionsWhere<PicklistEntity> | FindOptionsWhere<PicklistEntity>[] = {
            ...(isActive != null ? {isActive: isActive} : {}),
            ...(type ? {type: type} : {}),
            ...(!isEmpty(keyword) ? {name: ILike(`%${keyword}%`)} : {}),
        };
        return await this.repository.findAndCount({
            where: condition,
            skip: skip,
            take: pageSize,
            order: {[orderBy]: sortOrder},
        });
    }

    async findOneById(id: number): Promise<PicklistEntity> {
        return await this.repository.findOne({
            where: {
                id,
            },
        });
    }

    async findAllByIds(ids: number[]): Promise<PicklistEntity[]> {
        return await this.repository.find({
            where: {
                id: In(ids),
            },
        });
    }

}
