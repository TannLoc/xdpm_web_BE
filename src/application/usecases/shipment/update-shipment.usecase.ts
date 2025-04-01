import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {Injectable} from '@nestjs/common';
import {ShipmentMapper} from '@Infrastructure/service/mapper/shipment';
import {UpdateShipmentParamDto} from '@Presentation/shipment/dto/param';
import {ShipmentRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {UpdatedResultDto} from '@Presentation/dto/result';

@Injectable()
export class UpdateShipmentUseCase {
    constructor(
        private readonly shipmentRepositoryOrm: ShipmentRepositoryOrm,
        private readonly shipmentMapper: ShipmentMapper,
    ) {
    }

    async execute(id: number, param: UpdateShipmentParamDto): Promise<UpdatedResultDto> {
        const {quantity,importDate}= param
        var shipment = await this.shipmentRepositoryOrm.findOneById(id);
        if (!shipment) throw new BadRequestException('SHIPMENT005', ErrorCode.SHIPMENT005);
        let inventory = shipment.inventory
        if(inventory.import < shipment.quantity || inventory.stock < shipment.quantity)  throw new BadRequestException('SHIPMENT008', ErrorCode.SHIPMENT008);

        inventory.import -= shipment.quantity
        inventory.stock -= shipment.quantity

        shipment.importDate = importDate;
        shipment.quantity = quantity;

        inventory.import += shipment.quantity
        inventory.stock += shipment.quantity

        var result = await this.shipmentRepositoryOrm.updateOne(shipment);
        if (!result) throw new BadRequestException('SHIPMENT004', ErrorCode.SHIPMENT004);
        return new UpdatedResultDto({
            id,
            result,
        });
    }
}
