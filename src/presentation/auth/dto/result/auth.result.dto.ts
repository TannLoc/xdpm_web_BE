import {ApiProperty} from '@nestjs/swagger';

export class AuthResultDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    result: boolean = true;

    constructor(partial: Partial<AuthResultDto>) {
        Object.assign(this, partial);
    }
}
