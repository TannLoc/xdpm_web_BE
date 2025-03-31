import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';

//Application
import {
    CreateBrandUseCase,
    DeleteBrandUseCase,
    FindBrandsUseCase,
    FindOneBrandUseCase,
    UpdateBrandUseCase
} from '@Application/usecases/brand';

//Domain
import {BRANDS_ROUTERS, GENERIC_PATH, UserRole} from '@Domain/constants';
import {AuthGuard} from '@Domain/guards';

//Infrastructure
import {ApiResponse, PaginationResponse, Roles} from '@Infrastructure/decorator';

//Dto
import {BrandFilterDtoParam, CreateBrandParamDto, UpdateBrandParamDto} from '../dto/param';
import {BrandResultDto} from '../dto/result';
import {CreatedResultDto, DeletedResultDto, PaginationResult, UpdatedResultDto} from '@Presentation/dto/result';

@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
@ApiTags('Brand Management Controller')
@Controller(`${GENERIC_PATH.MANAGEMENT}/${BRANDS_ROUTERS.CONTROLLER}`)
export class BrandManagementController {
    constructor(
        private readonly createBrandUseCase: CreateBrandUseCase,
        private readonly findBrandUseCase: FindBrandsUseCase,
        private readonly updateBrandUseCase: UpdateBrandUseCase,
        private readonly deleteBrandUseCase: DeleteBrandUseCase,
        private readonly findOneBrandUseCase: FindOneBrandUseCase,
    ) {
    }

    @Post(BRANDS_ROUTERS.CREATE)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: CreatedResultDto})
    async create(@Body() param: CreateBrandParamDto): Promise<CreatedResultDto> {
        const result = await this.createBrandUseCase.execute(param);
        return result;
    }

    @Get(BRANDS_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    @ApiResponse({type: BrandResultDto, isPaginated: true})
    async find(@Query() param: BrandFilterDtoParam): Promise<PaginationResult<BrandResultDto>> {
        const result = await this.findBrandUseCase.execute(param);
        return result;
    }

    @Put(BRANDS_ROUTERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiResponse({type: UpdatedResultDto})
    async update(@Param('id') id: number, @Body() param: UpdateBrandParamDto): Promise<UpdatedResultDto> {
        const result = await this.updateBrandUseCase.execute(id, param);
        return result;
    }

    @Delete(BRANDS_ROUTERS.DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiResponse({type: DeletedResultDto})
    async delete(@Param('id') id: number): Promise<DeletedResultDto> {
        const result = await this.deleteBrandUseCase.execute(id);
        return result;
    }

    @Get(BRANDS_ROUTERS.FIND_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiResponse({type: BrandResultDto})
    async findOne(@Param('id') id: number): Promise<BrandResultDto> {
        const result = await this.findOneBrandUseCase.execute(id);
        return result;
    }
}
