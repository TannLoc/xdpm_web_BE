import {ProductEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {ItemProductResultDto, ItemViewProductResultDto, ProductResultDto} from '@Presentation/product/dto/result';
import {CloudinaryMapper} from '../cloudinary';
import {PicklistMapper} from '../picklist';
import {BrandMapper} from '../brand';

@Injectable()
export class ProductMapper {
    constructor(
        private readonly cloudinaryMapper: CloudinaryMapper,
        private readonly picklistMapper: PicklistMapper,
        private readonly brandMapper: BrandMapper,
    ) {
    }

    toItemProductResultDto(prod: ProductEntity): ItemProductResultDto {
        var dto = new ItemProductResultDto();
        dto.id = prod.id;
        dto.name = prod.name;
        dto.image = prod.image != null ? this.cloudinaryMapper.toCloudinaryResultDto(prod.image) : null;
        dto.code = prod.code;
        dto.import = prod.inventory.import;
        dto.stock = prod.inventory.stock;
        dto.sold = prod.inventory.sold;
        dto.isActive = prod.isActive;
        dto.createdAt = prod.createdAt;
        dto.updatedAt = prod.updatedAt;
        return dto;
    }

    toProductResultDto(prod: ProductEntity): ProductResultDto {
        var dto = new ProductResultDto();
        dto.id = prod.id;
        dto.name = prod.name;
        dto.image = prod.image != null ? this.cloudinaryMapper.toCloudinaryResultDto(prod.image) : null;
        dto.images = prod.images.map((item) => this.cloudinaryMapper.toCloudinaryResultDto(item));
        dto.features = prod.features != null ? prod.features.map((item) => this.picklistMapper.toPicklistResultDto(item)) : null;
        dto.code = prod.code;
        dto.gender = prod.gender != null ? this.picklistMapper.toPicklistResultDto(prod.gender) : null;
        dto.marketSegment = prod.marketSegment != null ? this.picklistMapper.toPicklistResultDto(prod.marketSegment) : null;
        dto.movement = prod.movement != null ? this.picklistMapper.toPicklistResultDto(prod.movement) : null;
        dto.size = prod.size != null ? this.picklistMapper.toPicklistResultDto(prod.size) : null;
        dto.brand = prod.brand ? this.brandMapper.toBrandResultDto(prod.brand) : null;
        dto.import = prod.inventory.import;
        dto.stock = prod.inventory.stock;
        dto.sold = prod.inventory.sold;
        dto.price = prod.price;
        dto.isActive = prod.isActive;
        dto.salesPrice = prod.salesPrice;
        dto.createdAt = prod.createdAt;
        dto.updatedAt = prod.updatedAt;
        return dto;
    }

    toItemViewProductResultDto(prod: ProductEntity): ItemViewProductResultDto {
        var dto = new ItemViewProductResultDto();
        dto.id = prod.id;
        dto.name = prod.name;
        dto.image = prod.image != null ? this.cloudinaryMapper.toCloudinaryResultDto(prod.image) : null;
        dto.code = prod.code;
        dto.salesPrice = prod.salesPrice;
        dto.price = prod.price;
        dto.stock = prod.inventory.stock;
        return dto;
    }
}
