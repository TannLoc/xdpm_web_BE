
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsObject, IsOptional} from 'class-validator';
import {DeliveryOrderParamDto} from "@Presentation/order/dto/param/delivery-order.param.dto";

export class CreateOrderParamDto {
    @IsOptional()
    @IsNumber()
    customerId: number

    @IsNotEmpty()
    @ApiPropertyOptional({type: [Number]})
    cartIds: number[];

    @ApiProperty()
    @IsObject()
    delivery: DeliveryOrderParamDto;
}
