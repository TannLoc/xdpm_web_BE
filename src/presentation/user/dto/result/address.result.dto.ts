import {ApiProperty} from '@nestjs/swagger';

export class AddressResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    city: string;

    @ApiProperty()
    district: string;

    @ApiProperty()
    ward: string;

    @ApiProperty()
    text: string;
}
