
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional} from 'class-validator';
import {DeliveryOrderParamDto} from "@Presentation/order/dto/param/delivery-order.param.dto";
import { OrderPaymentType } from '@Domain/constants';

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

    @IsNotEmpty()
    @IsEnum(OrderPaymentType)
    @ApiProperty()
    paymentType : OrderPaymentType
}
