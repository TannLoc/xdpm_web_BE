import {ErrorCode} from '@Domain/constants';
import {BadRequestException} from '@Infrastructure/exception';
import {Injectable} from '@nestjs/common';
import {ShipmentMapper} from '@Infrastructure/service/mapper/shipment';
import {ShipmentResultDto} from '@Presentation/shipment/dto/result';
import {ShipmentRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';

@Injectable()
export class FindOneShipmentUseCase {
    constructor(
        private readonly shipmentRepositoryOrm: ShipmentRepositoryOrm,
        private readonly shipmentMapper: ShipmentMapper,
    ) {
    }

    async execute(id: number): Promise<ShipmentResultDto> {
        const shipment = await this.shipmentRepositoryOrm.findOneById(id);
        if (!shipment) throw new BadRequestException('SHIPMENT005', ErrorCode.SHIPMENT005);
        const dataReturn = await this.shipmentMapper.toShipmentResultDto(shipment);
        return dataReturn;
    }
}
