import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class VerifyOtpParamDto {
    @IsNotEmpty({message: ErrorCode.V053})
    @IsString({message: ErrorCode.V054})
    @ApiProperty({required: true})
    otp: string;

    @IsOptional()
    @IsString({message: ErrorCode.V004})
    @ApiPropertyOptional()
    email: string;
}
