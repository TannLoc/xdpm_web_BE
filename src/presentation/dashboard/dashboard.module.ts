import {DashboardUseCase} from "@Application/usecases/dashboard";
import {Module} from "@nestjs/common";
import {DashboardManagementController} from "@Presentation/dashboard/controller";

@Module({
    imports: [],
    controllers: [DashboardManagementController],
    providers: [DashboardUseCase],
})
export class DashboardModule {
}
