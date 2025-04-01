import {Controller, Get, HttpCode, HttpStatus, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

//Application
import {FindPicklistsUseCase} from '@Application/usecases/picklist';

//Domain
import {PICKLIST_ROUTERS} from '@Domain/constants';

//Infrastructure
import {ApiResponse, PaginationResponse} from '@Infrastructure/decorator';

//Dto
import {PicklistFilterDtoParam} from '../dto/param';
import {PicklistResultDto} from '../dto/result';

@ApiTags('Picklist Controller')
@Controller(PICKLIST_ROUTERS.CONTROLLER)
export class PicklistController {
    constructor(private readonly getPicklistUseCase: FindPicklistsUseCase) {
    }

    //Find All Picklist
    @Get(PICKLIST_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    @ApiResponse({type: PicklistResultDto, isPaginated: true})
    async get(@Query() param: PicklistFilterDtoParam) {
        const result = await this.getPicklistUseCase.execute(param);
        return result;
    }
}
