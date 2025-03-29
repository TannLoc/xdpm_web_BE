import {CloudinaryEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';

@Injectable()
export class CloudinaryRepositoryOrm {
    constructor(
        @InjectRepository(CloudinaryEntity)
        private readonly repository: Repository<CloudinaryEntity>,
    ) {
    }

    async create(param: CloudinaryEntity): Promise<CloudinaryEntity> {
        return await this.repository.save(param);
    }

    async findOneById(id: number): Promise<CloudinaryEntity | null> {
        return await this.repository.findOne({
            where: {
                id,
            },
        });
    }
    async findAllByIds(ids: number[]): Promise<CloudinaryEntity[]> {
        return await this.repository.find({
            where: {
                id: In(ids),
            },
        });
    }
}
