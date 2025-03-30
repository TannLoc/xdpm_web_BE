import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class AddProductToCartParamDto {
    @IsNotEmpty({message: ErrorCode.V057})
    @IsNumber({}, {message: ErrorCode.V058})
    @ApiProperty({required: true})
    productId: number;
}
