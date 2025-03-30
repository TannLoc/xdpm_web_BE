import {ApiProperty} from '@nestjs/swagger';

export class UpdatedResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    result: boolean;

    constructor(partial: Partial<UpdatedResultDto>) {
        Object.assign(this, partial);
    }
}
