import {ApiProperty} from "@nestjs/swagger";

export class DashboardResultDto {
    @ApiProperty()
    totalProduct: number = 0

    @ApiProperty()
    totalProductImport: number = 0

    @ApiProperty()
    totalProductSold: number = 0

    @ApiProperty()
    totalProductStock: number = 0

    @ApiProperty()
    totalCustomer: number = 0

    @ApiProperty()
    totalRevenue: number = 0

    @ApiProperty()
    totalOrderWaitingConfirm: number = 0

    @ApiProperty()
    totalOrderConfirmed: number = 0

    @ApiProperty()
    totalOrderDelivering: number = 0

    @ApiProperty()
    totalOrderCancel: number = 0

    @ApiProperty()
    totalOrderReceived: number = 0

    @ApiProperty()
    totalOrderReturned: number = 0

    @ApiProperty()
    totalBrand: number = 0
}