import {ErrorCode} from '@Domain/constants';
import {
    BrandRepositoryOrm,
    CloudinaryRepositoryOrm,
    PicklistRepositoryOrm,
    ProductRepositoryOrm
} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {UpdateProductParamDto} from '@Presentation/product/dto/param';
import {BadRequestException} from '@Infrastructure/exception';
import {UpdatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class UpdateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryOrm,
        private readonly cloudinaryRepositoryOrm: CloudinaryRepositoryOrm,
        private readonly picklistRepositoryOrm: PicklistRepositoryOrm,
        private readonly brandRepository: BrandRepositoryOrm,
    ) {
    }

    async execute(id: number, param: UpdateProductParamDto): Promise<UpdatedResultDto> {
        const {imageIds,featureIds,code,price,salesPrice,imageId,marketSegmentId,movementId,name,sizeId,genderId,brandId} = param
        let image, features, movement, marketSegment, size, gender, images,brand;
        var product = await this.productRepository.findDetailOneById(id);

        product.name = name;
        product.salesPrice= salesPrice
        product.price = price

        if(code != product.code){
            const isExistsCode =await this.productRepository.findOneByCode(code);
            if (isExistsCode) throw new BadRequestException('PROD002', ErrorCode.PROD002);
            product.code = code
        }

        if (!product) throw new BadRequestException('PROD001', ErrorCode.PROD001);
        if (imageId) {
            image = await this.cloudinaryRepositoryOrm.findOneById(imageId);
            if (!image) throw new BadRequestException('PROD012', ErrorCode.PROD012);
            product.image = image
        }

        if (brandId) {
            brand = await this.brandRepository.findOneById(brandId);
            if (!brand) throw new BadRequestException('PROD013', ErrorCode.PROD013);
            product.brand = brand
        }
        if (marketSegmentId) {
            marketSegment = await this.picklistRepositoryOrm.findOneById(marketSegmentId);
            if (!marketSegment) throw new BadRequestException('PROD008', ErrorCode.PROD008);
            product.marketSegment = marketSegment

        }
        if (movementId) {
            movement = await this.picklistRepositoryOrm.findOneById(movementId);
            if (!movement) throw new BadRequestException('PROD009', ErrorCode.PROD009);
            product.movement = movement

        }
        if (sizeId) {
            size = await this.picklistRepositoryOrm.findOneById(sizeId);
            if (!size) throw new BadRequestException('PROD011', ErrorCode.PROD011);
            product.size = size
        }
        if (genderId) {
            gender = await this.picklistRepositoryOrm.findOneById(genderId);
            if (!gender) throw new BadRequestException('PROD007', ErrorCode.PROD007);
            product.gender = gender

        }
        if (featureIds && featureIds.length > 0) {
            features = await this.picklistRepositoryOrm.findAllByIds(featureIds);
        }
        if (imageIds) {
            images = await this.cloudinaryRepositoryOrm.findAllByIds(imageIds)
            product.images = images;
        }

        var result = await this.productRepository.updateOne(product);
        if (!result) throw new BadRequestException('PROD005', ErrorCode.PROD005);
        return new UpdatedResultDto({
            id,
            result,
        });
    }
}
