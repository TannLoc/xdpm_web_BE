import {Module} from '@nestjs/common';
import {
    CreateShipmentUseCase,
    DeleteShipmentUseCase,
    FindOneShipmentUseCase,
    FindShipmentsUseCase,
    UpdateShipmentUseCase
} from '@Application/usecases/shipment';
import {ShipmentManagementController} from './controller';

@Module({
    imports: [],
    providers: [CreateShipmentUseCase, DeleteShipmentUseCase, FindShipmentsUseCase, FindOneShipmentUseCase, UpdateShipmentUseCase],
    controllers: [ShipmentManagementController],
})
export class ShipmentModule {
}
