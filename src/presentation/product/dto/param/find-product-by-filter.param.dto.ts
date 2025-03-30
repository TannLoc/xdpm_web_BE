import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

//Domain
//Presentation
import {PagingParamDto} from '@Presentation/dto/param/paging.param.dto';
import {Transform, Type} from 'class-transformer';

export class ProductFilterDtoParam extends PagingParamDto {
    @IsOptional()
    @ApiPropertyOptional()
    keyword: string;

    @IsOptional()
    @Transform(({value}) => value === 'true')
    @ApiPropertyOptional()
    isActive?: boolean = null;

    @IsOptional()
    @Transform(({value}) => value.split(',').map((val: string) => Number(val)))
    @ApiPropertyOptional({type: [Number]})
    featureIds: number[] = null;

    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    movementId: number= null;

    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    brandId: number= null;

    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    marketSegmentId: number= null;

    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    sizeId: number= null;

    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    genderId: number= null;
}
