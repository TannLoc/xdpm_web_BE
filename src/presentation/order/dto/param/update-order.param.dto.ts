import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateOrderParamDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    district: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ward: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    note: string;
}
