import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, HttpCode, HttpStatus, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@Domain/guards";
import {GENERIC_PATH, USER_ROUTERS, UserRole} from "@Domain/constants";
import {PaginationResponse, Roles} from "@Infrastructure/decorator";
import {FindCustomersUsecase} from "@Application/usecases/user/find-customers.usecase";
import {CustomerFilterDtoParam} from "@Presentation/user/dto/param";

@ApiTags('User Management Controller')
@UseGuards(AuthGuard)
@Controller(`${GENERIC_PATH.MANAGEMENT}/${USER_ROUTERS.FIND_CUSTOMER}`)
export class UserManagementController {
    constructor(
        private readonly findCustomersUsecase: FindCustomersUsecase,
    ) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    async find(@Query() param: CustomerFilterDtoParam) {
        var result = await this.findCustomersUsecase.execute(param);
        return result;
    }
}