import {Injectable} from '@nestjs/common';
import {ShipmentMapper} from '@Infrastructure/service/mapper/shipment';
import {ShipmentFilterDtoParam} from '@Presentation/shipment/dto/param';
import {ShipmentRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {ShipmentResultDto} from '@Presentation/shipment/dto/result';
import {PaginationResult} from '@Presentation/dto/result';

@Injectable()
export class FindShipmentsUseCase {
    constructor(
        private readonly shipmentRepositoryOrm: ShipmentRepositoryOrm,
        private readonly shipmentMapper: ShipmentMapper,
    ) {
    }

    async execute(param: ShipmentFilterDtoParam): Promise<PaginationResult<ShipmentResultDto>> {
        const {page, pageSize} = param;
        var [data, total] = await this.shipmentRepositoryOrm.findAllByFilter(param);
        var dateReturn = data.map((item) => this.shipmentMapper.toShipmentResultDto(item));
        return new PaginationResult<ShipmentResultDto>({
            data: dateReturn,
            total,
            page,
            pageSize,
        });
    }
}
