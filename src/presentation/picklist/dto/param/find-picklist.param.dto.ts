import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsOptional, IsString} from 'class-validator';

//Domain
import {PicklistType} from '@Domain/constants';

//Presentation
import {PagingParamDto} from '@Presentation/dto/param';
import {Transform} from 'class-transformer';

export class PicklistFilterDtoParam extends PagingParamDto {
    @IsOptional()
    @IsEnum(PicklistType)
    @ApiPropertyOptional()
    type: PicklistType;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    keyword: string = '';

    @IsOptional()
    @Transform(({value}) => value === 'true')
    @ApiPropertyOptional()
    isActive?: boolean = null;
}
