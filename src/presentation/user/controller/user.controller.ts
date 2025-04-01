import {Body, Controller, Get, HttpCode, HttpStatus, Put, Req, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {USER_ROUTERS, UserRole} from '@Domain/constants';
import {FindProfileUsecase, UpdateProfileUsecase} from '@Application/usecases/user';
import {AuthGuard} from '@Domain/guards';
import {ApiResponse, Roles} from '@Infrastructure/decorator';
import {ProfileResultDto} from '@Presentation/user/dto/result';
import {UpdatedResultDto} from '@Presentation/dto/result';
import {UpdateProfileParamDto} from '@Presentation/user/dto/param';

@ApiTags('User Controller')
@UseGuards(AuthGuard)
@Controller(USER_ROUTERS.CONTROLLER)
export class UserController {
    constructor(
        private readonly findProfileUsecase: FindProfileUsecase,
        private readonly updateProfileUsecase: UpdateProfileUsecase,
    ) {
    }

    @Get(USER_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
    @ApiResponse({type: ProfileResultDto})
    async find(@Req() request: Request) {
        var payload = request['payload'];
        var result = await this.findProfileUsecase.execute(payload.userId);
        return result;
    }

    @Put(USER_ROUTERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
    @ApiResponse({type: UpdatedResultDto})
    async update(@Body() param: UpdateProfileParamDto, @Req() request: Request): Promise<UpdatedResultDto> {
        var payload = request['payload'];
        const result = await this.updateProfileUsecase.execute(payload.userId, param);
        return result;
    }
}
