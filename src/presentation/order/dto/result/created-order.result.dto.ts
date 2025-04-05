import { OrderPaymentType } from "@Domain/constants";
import { ApiProperty } from "@nestjs/swagger";

export class CreatedOrderResultDto {
    @ApiProperty()
    orderId: number

    @ApiProperty()
    orderCode: string

    @ApiProperty()
    orderPaymentType: OrderPaymentType

    @ApiProperty()
    url: string

    constructor(partial: Partial<CreatedOrderResultDto>) {
        Object.assign(this, partial);
    }
}