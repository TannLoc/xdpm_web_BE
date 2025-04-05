import { ApiProperty } from "@nestjs/swagger";

export class PaymentOrderResultDto{
    
    @ApiProperty()
    orderCode: string

    @ApiProperty()
    isSuccess: boolean

    @ApiProperty()
    payDate: string | number

    @ApiProperty()
    amount: string | number
    constructor(partial : Partial<PaymentOrderResultDto>){
        Object.assign(this, partial);
    }
}