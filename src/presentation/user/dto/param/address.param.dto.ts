import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class AddressParamDto {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

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
}
