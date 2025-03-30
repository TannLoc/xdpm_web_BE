import {ApiProperty} from '@nestjs/swagger';

//Presentation
import {ItemProductResultDto} from '@Presentation/product/dto/result';

export class ShipmentResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    product: ItemProductResultDto;

    @ApiProperty()
    importDate: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
