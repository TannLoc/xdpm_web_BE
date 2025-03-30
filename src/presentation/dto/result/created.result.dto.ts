import {ApiProperty} from '@nestjs/swagger';

export class CreatedResultDto {
    @ApiProperty()
    id: number;

    constructor(partial: Partial<CreatedResultDto>) {
        Object.assign(this, partial);
    }
}
