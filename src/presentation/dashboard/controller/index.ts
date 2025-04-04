import {ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@Domain/guards";
import {Controller, Get, HttpCode, HttpStatus, UseGuards} from "@nestjs/common";
import {UserRole} from "@Domain/constants";
import {ApiResponse, Roles} from "@Infrastructure/decorator";
import {DashboardResultDto} from "@Presentation/dashboard/dto";
import {DashboardUseCase} from "@Application/usecases/dashboard";

// @UseGuards(AuthGuard)
// @Roles(UserRole.ADMIN)
@ApiTags('Dashboard Management Controller')
@Controller('management')
export class DashboardManagementController {
    constructor(
        private readonly dashboardUsecase: DashboardUseCase
    ) {
    }

    @Get('dashboard')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: DashboardResultDto})
    async index() {

        const result = await this.dashboardUsecase.execute()
        return result;
    }
}