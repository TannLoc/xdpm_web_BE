import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

//Domain
import {PicklistType} from '@Domain/constants';

export class CreatePicklistParamDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({required: true})
    label: string;

    @IsNotEmpty()
    @IsEnum(PicklistType)
    @ApiProperty({required: true})
    type: PicklistType;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    color: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    priorty: number;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    url: string;
}
