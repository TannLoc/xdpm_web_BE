import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional, IsString} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class SendOtpParamDto {
    @IsOptional()
    @IsString({message: ErrorCode.V004})
    @ApiPropertyOptional()
    email: string;
}
