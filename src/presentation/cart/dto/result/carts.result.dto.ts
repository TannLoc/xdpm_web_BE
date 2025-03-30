import {ApiProperty} from '@nestjs/swagger';

//Presentation
import {ItemViewProductResultDto} from '@Presentation/product/dto/result';

export class CartResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    product: ItemViewProductResultDto;

    @ApiProperty()
    quantity: number;
}
