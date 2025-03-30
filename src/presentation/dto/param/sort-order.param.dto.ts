import {SortOrderType} from '@Domain/constants';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsOptional} from 'class-validator';

export class SortOrderParamDto {
    @IsOptional()
    @ApiPropertyOptional()
    orderBy: string = 'updatedAt';

    @IsEnum(SortOrderType)
    @IsOptional()
    @ApiPropertyOptional()
    sortOrder: SortOrderType = SortOrderType.DESC;
}
