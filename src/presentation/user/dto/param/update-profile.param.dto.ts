import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional, IsString} from 'class-validator';

export class UpdateProfileParamDto {
    @ApiPropertyOptional()
    @IsOptional()
    avatarId: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    email: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    fullName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phoneNumber: string;

    @ApiPropertyOptional()
    @IsOptional()
    birthday: Date;
}
