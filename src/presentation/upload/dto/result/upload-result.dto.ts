import {ApiProperty} from '@nestjs/swagger';

export class CloudinaryResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;
}
