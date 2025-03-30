import {ApiProperty} from '@nestjs/swagger';

export class PaginationResult<T> {
    @ApiProperty()
    data: T[];

    @ApiProperty()
    page: number;

    @ApiProperty()
    pageSize: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    totalPage: number;

    constructor(partial: Partial<PaginationResult<T>>) {
        Object.assign(this, partial);
    }
}
