import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class LoginCustomerParamDto {
    @IsNotEmpty({message: ErrorCode.V020})
    @IsString({message: ErrorCode.V021})
    @ApiProperty({required: true})
    phoneNumber: string;

    @IsNotEmpty({message: ErrorCode.V013})
    @IsString({message: ErrorCode.V017})
    @MinLength(6, {message: ErrorCode.V014})
    @MaxLength(30, {message: ErrorCode.V015})
    @ApiProperty({required: true})
    password: string;
}
