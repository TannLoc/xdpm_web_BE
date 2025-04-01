import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';

//Application
import {
    CreateShipmentUseCase,
    DeleteShipmentUseCase,
    FindOneShipmentUseCase,
    FindShipmentsUseCase,
    UpdateShipmentUseCase
} from '@Application/usecases/shipment';

//Domain
import {GENERIC_PATH, SHIPMENT_ROUTERS, UserRole} from '@Domain/constants';
import {AuthGuard} from '@Domain/guards';

//Infrastructure
import {ApiResponse, PaginationResponse, Roles} from '@Infrastructure/decorator';

//Dto
import {CreateShipmentParamDto, ShipmentFilterDtoParam, UpdateShipmentParamDto} from '../dto/param';
import {ShipmentResultDto} from '../dto/result';
import {CreatedResultDto, DeletedResultDto, PaginationResult, UpdatedResultDto} from '@Presentation/dto/result';

@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
@ApiTags('Shipment Management Controller')
@Controller(`${GENERIC_PATH.MANAGEMENT}/${SHIPMENT_ROUTERS.CONTROLLER}`)
export class ShipmentManagementController {
    constructor(
        private readonly createShipmentUseCase: CreateShipmentUseCase,
        private readonly findShipmentsUseCase: FindShipmentsUseCase,
        private readonly updateShipmentsUseCase: UpdateShipmentUseCase,
        private readonly deleteShipmentUseCase: DeleteShipmentUseCase,
        private readonly findOneByIdShipmentUseCase: FindOneShipmentUseCase,
    ) {
    }

    @Post(SHIPMENT_ROUTERS.CREATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: CreatedResultDto})
    async create(@Body() param: CreateShipmentParamDto): Promise<CreatedResultDto> {
        const result = await this.createShipmentUseCase.execute(param);
        return result;
    }

    @Get(SHIPMENT_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    @ApiResponse({type: ShipmentResultDto, isPaginated: true})
    async find(@Query() param: ShipmentFilterDtoParam): Promise<PaginationResult<ShipmentResultDto>> {
        const result = await this.findShipmentsUseCase.execute(param);
        return result;
    }

    @Put(SHIPMENT_ROUTERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiResponse({type: UpdatedResultDto})
    async update(@Param('id') id: number, @Body() param: UpdateShipmentParamDto): Promise<UpdatedResultDto> {
        const result = await this.updateShipmentsUseCase.execute(id, param);
        return result;
    }

    @Delete(SHIPMENT_ROUTERS.DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiResponse({type: DeletedResultDto})
    async delete(@Param('id') id: number): Promise<DeletedResultDto> {
        const result = await this.deleteShipmentUseCase.execute(id);
        return result;
    }

    @Get(SHIPMENT_ROUTERS.FIND_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: ShipmentResultDto})
    async findOneById(@Param('id') id: number): Promise<ShipmentResultDto> {
        const result = await this.findOneByIdShipmentUseCase.execute(id);
        return result;
    }
}
