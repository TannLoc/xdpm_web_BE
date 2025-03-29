import {ProductEntity} from '@Domain/entity/product.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProductFilterDtoParam} from '@Presentation/product/dto/param';
import {In, Repository} from 'typeorm';

@Injectable()
export class ProductRepositoryOrm {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>,
    ) {
    }

    async create(param: ProductEntity): Promise<ProductEntity> {
        return await this.repository.save(param);
    }

    async count(): Promise<number> {
        return await this.repository.count()
    }
    async countByBrandId(brandId: number): Promise<number> {
        return await this.repository.count({
            where:{
                brand:{
                    id: brandId
                }
            }
        })
    }

    async findDetailOneById(id: number): Promise<ProductEntity> {
        return await this.repository.findOne({
            where: {
                id,
            },
            relations: {
                features: true,
                gender: true,
                images: true,
                marketSegment: true,
                movement: true,
                inventory: true,
                size: true,
                brand: true,
            },
        });
    }

    async findOneById(id: number): Promise<ProductEntity> {
        return await this.repository.findOne({
            where: {
                id,
            }
        });
    }

    async findOneByCode(code: string): Promise<ProductEntity> {
        return await this.repository.findOne({
            where: {
                code,
            },
        });
    }

    async setActive(id: number, isActive: boolean): Promise<boolean> {
        const result = await this.repository.update(id, {isActive});
        return result.affected !== null && result.affected > 0;
    }

    async updateOne(param: ProductEntity): Promise<boolean> {
        try {
            var result = await this.repository.save(param);
            return result != null;
        } catch (ex) {
            throw new Error(ex);
        }
    }

    async findAllByIds(ids: number[]): Promise<ProductEntity[]> {

        return await this.repository.find({
            where: {
                id: In(ids)
            }
        })
    }

    async findAllByFilter(filter: ProductFilterDtoParam): Promise<[ProductEntity[], number]> {
        const {
            keyword,
            orderBy,
            skip,
            sortOrder,
            brandId,
            featureIds,
            genderId,
            marketSegmentId,
            movementId,
            sizeId,
            isActive,
            pageSize
        } = filter;
        var queryBuilder = this.repository.createQueryBuilder('product')
            .leftJoinAndSelect("product.inventory", "inventory")
            .leftJoinAndSelect("product.image", "image")
            .leftJoin('product.features', 'features')
        isActive != null && queryBuilder.andWhere("product.isActive = :isActive", {isActive});
        keyword && keyword.trim() !== "" && queryBuilder.andWhere("product.name ILIKE :keyword", {keyword: `%${keyword}%`});
        brandId && brandId !== 0 && queryBuilder.andWhere("product.brand_id = :brandId", {brandId});
        featureIds && featureIds.length > 0 && queryBuilder.andWhere('features.id IN (:...featureIds)', {featureIds}) && queryBuilder.having('COUNT(DISTINCT features.id) = :featureCount', {featureCount: featureIds.length});
        genderId && genderId !== 0 && queryBuilder.andWhere("product.gender_id = :genderId", {genderId});
        marketSegmentId && marketSegmentId !== 0 && queryBuilder.andWhere("product.market_segment_id = :marketSegmentId", {marketSegmentId});
        movementId && movementId !== 0 && queryBuilder.andWhere("product.movement_id = :movementId", {movementId});
        sizeId && sizeId !== 0 && queryBuilder.andWhere("product.size_id = :sizeId", {sizeId});
        queryBuilder.orderBy(`product.${orderBy}`, sortOrder as "ASC" | "DESC")
            .skip(skip)
            .take(pageSize);
        queryBuilder
            .groupBy('product.id')
            .addGroupBy('product.name')
            .addGroupBy('product.code')
            .addGroupBy('product.salesPrice')
            .addGroupBy('product.price')
            .addGroupBy('product.price')
            .addGroupBy('product.created_at')
            .addGroupBy('product.updated_at')
            .addGroupBy('image.id')
            .addGroupBy('image.url')
            .addGroupBy('inventory.stock')
            .addGroupBy('inventory.id')
            .addGroupBy('inventory.sold')
            .addGroupBy('inventory.import')
        return await queryBuilder.getManyAndCount();


    }
}
