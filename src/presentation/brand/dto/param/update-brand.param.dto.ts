import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsNumber, IsOptional, IsString} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class UpdateBrandParamDto {
    @IsOptional()
    @IsString({message: ErrorCode.V002})
    @ApiPropertyOptional()
    name: string;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V008})
    @ApiPropertyOptional()
    imageId: number;
}
