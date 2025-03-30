import {ApiProperty} from '@nestjs/swagger';

//Presentation
import {CloudinaryResultDto} from '@Presentation/upload/dto/result';

export class ItemProductResultDto {
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
    import: number;

    @ApiProperty()
    sold: number;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    image: CloudinaryResultDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
