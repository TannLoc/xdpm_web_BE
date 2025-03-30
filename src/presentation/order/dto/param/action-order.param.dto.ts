import {IsEnum, IsNotEmpty} from 'class-validator';
import {OrderState} from '@Domain/constants';
import {ApiProperty} from "@nestjs/swagger";

export class ActionOrderParamDto {
    @IsNotEmpty()
    @IsEnum(OrderState)
    @ApiProperty()
    state: OrderState;
}
