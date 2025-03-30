import {ApiProperty} from '@nestjs/swagger';
import {BrandResultDto} from '@Presentation/brand/dto/result';

//Presentation
import {PicklistResultDto} from '@Presentation/picklist/dto/result';
import {CloudinaryResultDto} from '@Presentation/upload/dto/result';

export class ProductResultDto {
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
    isActive: boolean;

    @ApiProperty()
    stock: number;

    @ApiProperty({type: PicklistResultDto, isArray: true})
    features: PicklistResultDto[];

    @ApiProperty({type: CloudinaryResultDto, isArray: true})
    images: CloudinaryResultDto[];

    @ApiProperty()
    movement: PicklistResultDto;

    @ApiProperty()
    marketSegment: PicklistResultDto;

    @ApiProperty()
    size: PicklistResultDto;

    @ApiProperty()
    brand: BrandResultDto;

    @ApiProperty()
    gender: PicklistResultDto;

    @ApiProperty()
    image: CloudinaryResultDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
