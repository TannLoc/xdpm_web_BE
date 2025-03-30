import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, Min} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class CreateShipmentParamDto {
    @IsNotEmpty({message: ErrorCode.V045})
    @IsNumber({}, {message: ErrorCode.V044})
    @Min(0, {message: ErrorCode.V043})
    @ApiProperty({required: true})
    quantity: number;

    @IsNotEmpty({message: ErrorCode.V047})
    @IsNumber({}, {message: ErrorCode.V046})
    @ApiProperty({required: true})
    productId: number;

    @IsNotEmpty({message: ErrorCode.V049})
    @ApiProperty({required: true})
    importDate: Date;
}
