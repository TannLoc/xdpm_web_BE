import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

//Domain
//Presentation
import {PagingParamDto} from '@Presentation/dto/param/paging.param.dto';
import {Transform} from 'class-transformer';

export class BrandFilterDtoParam extends PagingParamDto {
    @IsOptional()
    @ApiPropertyOptional()
    keyword: string = '';

    @IsOptional()
    @Transform(({value}) => value === 'true')
    @ApiPropertyOptional()
    isActive?: boolean = null;
}
