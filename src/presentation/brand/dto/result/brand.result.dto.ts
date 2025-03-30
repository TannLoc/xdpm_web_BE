import {ApiProperty} from '@nestjs/swagger';

//Presentation
import {CloudinaryResultDto} from '@Presentation/upload/dto/result';

export class BrandResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    totalProduct: number;

    @ApiProperty()
    image: CloudinaryResultDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
