import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class CreateBrandParamDto {
    @IsNotEmpty({message: ErrorCode.V001})
    @IsString({message: ErrorCode.V002})
    @ApiProperty({required: true})
    name: string;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V008})
    @ApiPropertyOptional()
    imageId: number;
}
