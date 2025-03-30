import {ApiProperty} from '@nestjs/swagger';

export class DeletedResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    result: boolean;

    constructor(partial: Partial<DeletedResultDto>) {
        Object.assign(this, partial);
    }
}
