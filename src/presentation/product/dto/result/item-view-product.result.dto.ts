import {ApiProperty} from '@nestjs/swagger';

//Presentation
import {CloudinaryResultDto} from '@Presentation/upload/dto/result';

export class ItemViewProductResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    salesPrice: number;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    image: CloudinaryResultDto;
}
