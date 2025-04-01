import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
//Application
import {CreatePicklistUseCase} from '@Application/usecases/picklist';

//Domain
import {GENERIC_PATH, PICKLIST_ROUTERS, UserRole} from '@Domain/constants';
import {AuthGuard} from '@Domain/guards';

//Infrastructure
import {ApiResponse, Roles} from '@Infrastructure/decorator';

//Dto
import {CreatePicklistParamDto} from '../dto/param';
import {PicklistResultDto} from '../dto/result';

@ApiTags('Picklist Management Controller')
@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
@Controller(`${GENERIC_PATH.MANAGEMENT}/${PICKLIST_ROUTERS.CONTROLLER}`)
export class PicklistManagementController {
    constructor(private readonly createPicklistUseCase: CreatePicklistUseCase) {
    }

    // Create Picklist
    @Post(PICKLIST_ROUTERS.CREATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: PicklistResultDto})
    async create(@Body() param: CreatePicklistParamDto): Promise<PicklistResultDto> {
        const result = await this.createPicklistUseCase.execute(param);
        return result;
    }
}
