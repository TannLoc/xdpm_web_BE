import {Type} from 'class-transformer';
import {IsOptional} from 'class-validator';
import {SortOrderParamDto} from './sort-order.param.dto';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class PagingParamDto extends SortOrderParamDto {
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    pageSize?: number = 10;

    get skip(): number {
        return (this.page! - 1) * this.pageSize!;
    }
}
