import {ApiProperty} from '@nestjs/swagger';

export class PicklistResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    label: string;

    @ApiProperty()
    color: string;
}
