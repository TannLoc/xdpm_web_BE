import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class RegisterParamDto {
    @IsNotEmpty({message: ErrorCode.V018})
    @IsString({message: ErrorCode.V019})
    @ApiProperty({required: true})
    fullName: string;

    @IsNotEmpty({message: ErrorCode.V020})
    @MaxLength(10, {message: ErrorCode.V022})
    @Matches(/^\d{10}$/, {message: ErrorCode.V022})
    @ApiProperty({required: true})
    phoneNumber: string;

    @IsOptional({message: ErrorCode.V003})
    @IsString({message: ErrorCode.V004})
    @ApiProperty({required: true})
    email: string;

    @IsNotEmpty({message: ErrorCode.V013})
    @IsString({message: ErrorCode.V017})
    @MinLength(6, {message: ErrorCode.V014})
    @MaxLength(30, {message: ErrorCode.V015})
    @ApiProperty({required: true})
    password: string;

    @IsOptional()
    @ApiPropertyOptional()
    birthDay: Date;
}
