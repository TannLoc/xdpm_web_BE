import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, Min} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class UpdateCartParamDto {
    @IsNotEmpty({message: ErrorCode.V045})
    @IsNumber({}, {message: ErrorCode.V044})
    @Min(1, {message: ErrorCode.V059})
    @ApiProperty({required: true})
    quantity: number;
}
