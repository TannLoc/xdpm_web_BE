import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {InventoryRepositoryOrm, ShipmentRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {DeletedResultDto} from '@Presentation/dto/result';

@Injectable()
export class DeleteShipmentUseCase {
    constructor(
        private readonly shipmentRepositoryOrm: ShipmentRepositoryOrm,
        private readonly productInventoryRepositoryOrm: InventoryRepositoryOrm,
    ) {
    }

    async execute(id: number): Promise<DeletedResultDto> {
        var shipment = await this.shipmentRepositoryOrm.findOneById(id);
        if (!shipment) throw new BadRequestException('SHIPMENT005', ErrorCode.SHIPMENT005);

        var inventory = await this.productInventoryRepositoryOrm.findOneById(shipment.inventory.id);
        if (shipment.quantity > inventory.import && shipment.quantity > inventory.stock) throw new BadRequestException('SHIPMENT006', ErrorCode.SHIPMENT006);
        inventory.import -= shipment.quantity;
        inventory.stock -= shipment.quantity;
        var updateInventory = await this.productInventoryRepositoryOrm.updateOne(inventory);
        if (!updateInventory) throw new BadRequestException('SHIPMENT003', ErrorCode.SHIPMENT003);
        var result = await this.shipmentRepositoryOrm.deleteOneById(id);
        if(!result)  throw new BadRequestException('SHIPMENT007', ErrorCode.SHIPMENT007);
        return new DeletedResultDto({
            id,
        });
    }
}
