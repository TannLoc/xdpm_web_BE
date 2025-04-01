import {ErrorCode} from '@Domain/constants';
import {InventoryEntity, ProductEntity} from '@Domain/entity';
import {BadRequestException} from '@Infrastructure/exception';
import {
    BrandRepositoryOrm,
    CloudinaryRepositoryOrm,
    PicklistRepositoryOrm,
    ProductRepositoryOrm
} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {CreateProductParamDto} from '@Presentation/product/dto/param';
import {CreatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryOrm,
        private readonly cloudinaryRepositoryOrm: CloudinaryRepositoryOrm,
        private readonly picklistRepositoryOrm: PicklistRepositoryOrm,
        private readonly brandRepository: BrandRepositoryOrm,
    ) {
    }

    async execute(param: CreateProductParamDto): Promise<CreatedResultDto> {
        const {featureIds,code,price,salesPrice,imageId,marketSegmentId,movementId,name,sizeId,genderId,brandId} = param
        var product = await this.productRepository.findOneByCode(code);
        if (product) throw new BadRequestException('PROD002', ErrorCode.PROD002);

        let image, features,  movement, marketSegment, size, gender, brand;

        if (imageId) {
            image = await this.cloudinaryRepositoryOrm.findOneById(imageId);
            if (!image) throw new BadRequestException('PROD012', ErrorCode.PROD012);
        }

        if (brandId) {
            brand = await this.brandRepository.findOneById(brandId);
            if (!brand) throw new BadRequestException('PROD013', ErrorCode.PROD013);
        }
        if (marketSegmentId) {
            marketSegment = await this.picklistRepositoryOrm.findOneById(marketSegmentId);
            if (!marketSegment) throw new BadRequestException('PROD008', ErrorCode.PROD008);
        }
        if (movementId) {
            movement = await this.picklistRepositoryOrm.findOneById(movementId);
            if (!movement) throw new BadRequestException('PROD009', ErrorCode.PROD009);
        }
        if (sizeId) {
            size = await this.picklistRepositoryOrm.findOneById(sizeId);
            if (!size) throw new BadRequestException('PROD011', ErrorCode.PROD011);
        }
        if (genderId) {
            gender = await this.picklistRepositoryOrm.findOneById(genderId);
            if (!gender) throw new BadRequestException('PROD007', ErrorCode.PROD007);
        }
        if (featureIds && featureIds.length > 0) {
            features = await this.picklistRepositoryOrm.findAllByIds(featureIds);
        }

        var entity = new ProductEntity({
            name: name,
            code: code,
            price: price,
            salesPrice: salesPrice,
            features: features,
            movement: movement,
            marketSegment: marketSegment,
            size: size,
            gender: gender,
            image: image,
            brand: brand,
            inventory: new InventoryEntity({})
        });
        var result = await this.productRepository.create(entity);
        if (!result) throw new BadRequestException('PROD005', ErrorCode.PROD005);
        return new CreatedResultDto({
            id: result.id,
        });
    }
}
