import {ShipmentEntity} from '@Domain/entity/shipment.entity';
import {Injectable} from '@nestjs/common';
import {ShipmentResultDto} from '@Presentation/shipment/dto/result';
import {ProductMapper} from '../product';

@Injectable()
export class ShipmentMapper {
    constructor(private readonly productMapper: ProductMapper) {
    }

    toShipmentResultDto(param: ShipmentEntity): ShipmentResultDto {
        var dto = new ShipmentResultDto();
        dto.id = param.id;
        dto.importDate = param.importDate;
        dto.product = this.productMapper.toItemProductResultDto(param.inventory.product);
        dto.quantity = param.quantity;
        dto.createdAt = param.createdAt;
        dto.updatedAt = param.updatedAt;
        return dto;
    }
}
