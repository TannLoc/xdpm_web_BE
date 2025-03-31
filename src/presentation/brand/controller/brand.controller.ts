import {Controller, Get, HttpCode, HttpStatus, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {BRANDS_ROUTERS} from '@Domain/constants';
import {FindBrandsUseCase} from '@Application/usecases/brand';
import {ApiResponse, PaginationResponse} from '@Infrastructure/decorator';
import {BrandFilterDtoParam} from '@Presentation/brand/dto/param';
import {BrandResultDto} from '@Presentation/brand/dto/result';

@ApiTags('Brand Controller')
@Controller(`${BRANDS_ROUTERS.CONTROLLER}`)
export class BrandController {
    constructor(private readonly findbrandUseCase: FindBrandsUseCase) {
    }

    @Get(BRANDS_ROUTERS.FIND)
    @HttpCode(HttpStatus.OK)
    @PaginationResponse()
    @ApiResponse({type: BrandResultDto, isPaginated: true})
    async find(@Query() param: BrandFilterDtoParam) {
        const result = await this.findbrandUseCase.execute(param);
        return result;
    }
}
