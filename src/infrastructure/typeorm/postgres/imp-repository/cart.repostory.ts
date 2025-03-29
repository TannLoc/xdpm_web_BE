import {CartEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';

@Injectable()
export class CartRepositoryOrm {
    constructor(
        @InjectRepository(CartEntity)
        private readonly repository: Repository<CartEntity>,
    ) {
    }
    async create(param: CartEntity): Promise<CartEntity> {
        return await this.repository.save(param);
    }

    async findOneById(id: number): Promise<CartEntity | null> {
        return await this.repository.findOne({
            where: {
                id,
            }

        });
    }
    async findOneByUserIdAndProductId(userId: number, productId: number): Promise<CartEntity | null> {
        return await this.repository.findOne({
            where: {
                customer:{
                    id: userId
                },
                product:{
                    id: productId
                }
            }
        });
    }

    async findAllByIds(ids: number[]): Promise<CartEntity[]> {
        return await this.repository.find({
            where: {
                id:In(ids)
            }

        });
    }

    async checkCart(userId: number, productId: number): Promise<boolean> {
        return await this.repository.exists({
            where: {
                product: {
                    id: productId,
                },
                customer: {
                    id: userId,
                },
            },
        });
    }

    async deleteByIds(ids: number[]){
        return await this.repository.delete({
            id: In(ids)
        });

    }

    async findAllByUserId(userId: number): Promise<[CartEntity[], number]> {
        return await this.repository.findAndCount({
            where: {
                customer: {
                    id: userId,
                },
            }
        });
    }

    async updateOne(param: CartEntity): Promise<boolean> {
        var result = await this.repository.update(param.id, param);
        return result.affected !== null && result.affected > 0;
    }

    async deleteOneById(id: number): Promise<boolean> {
        var result = await this.repository.delete(id);
        return result.affected !== null && result.affected > 0;
    }
}
