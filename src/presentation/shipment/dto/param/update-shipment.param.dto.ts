import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsOptional, Min} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class UpdateShipmentParamDto {
    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V044})
    @Min(0, {message: ErrorCode.V043})
    @ApiProperty()
    quantity: number;

    @IsOptional()
    @ApiProperty()
    importDate: Date;
}
