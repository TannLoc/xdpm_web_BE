import {CartEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {CartResultDto} from '@Presentation/cart/dto/result';
import {ProductMapper} from '../product';

@Injectable()
export class CartMapper {
    constructor(private readonly productMapper: ProductMapper) {
    }

    toCartResultDto(param: CartEntity): CartResultDto {
        var dto = new CartResultDto();
        dto.id = param.id;
        dto.product = param.product ? this.productMapper.toItemViewProductResultDto(param.product) : null;
        dto.quantity = param.quantity;
        return dto;
    }
}
