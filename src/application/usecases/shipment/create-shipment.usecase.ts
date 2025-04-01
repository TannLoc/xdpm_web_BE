import {ShipmentEntity} from '@Domain/entity/shipment.entity';
import {ShipmentRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository/shipment.repository';
import {Injectable} from '@nestjs/common';
import {CreateShipmentParamDto} from '@Presentation/shipment/dto/param';
import {InventoryRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {BadRequestException} from '@Infrastructure/exception';
import {ErrorCode} from '@Domain/constants';
import {CreatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class CreateShipmentUseCase {
    constructor(
        private readonly shipmentRepositoryOrm: ShipmentRepositoryOrm,
        private readonly productInventoryRepositoryOrm: InventoryRepositoryOrm,
    ) {
    }

    async execute(param: CreateShipmentParamDto): Promise<CreatedResultDto> {
        const {quantity,productId,importDate} = param
        var productInventory = await this.productInventoryRepositoryOrm.findOneByProductId(productId);
        if (!productInventory) throw new BadRequestException('SHIPMENT002', ErrorCode.SHIPMENT002);

        var entity = new ShipmentEntity({
            importDate: importDate,
            inventory: productInventory,
            quantity: quantity,
        });

        var result = await this.shipmentRepositoryOrm.create(entity);
        if (!result) throw new BadRequestException('SHIPMENT001', ErrorCode.SHIPMENT001);

        productInventory.import += quantity;
        productInventory.stock += quantity;

        var updateInventory = this.productInventoryRepositoryOrm.updateOne(productInventory);
        if (!updateInventory) throw new BadRequestException('SHIPMENT003', ErrorCode.SHIPMENT003);
        return new CreatedResultDto({
            id: result.id,
        });
    }
}
