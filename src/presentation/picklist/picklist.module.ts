import {Module} from '@nestjs/common';
import {CreatePicklistUseCase, FindPicklistsUseCase} from '@Application/usecases/picklist';
import {PicklistController, PicklistManagementController} from './controller';

@Module({
    imports: [],
    controllers: [PicklistController, PicklistManagementController],
    providers: [CreatePicklistUseCase, FindPicklistsUseCase],
})
export class PicklistModule {
}
