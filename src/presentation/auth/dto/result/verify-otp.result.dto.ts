import {ApiProperty} from '@nestjs/swagger';

export class VerifyOtpResultDto {
    @ApiProperty()
    result: boolean;

    constructor(partial: Partial<VerifyOtpResultDto>) {
        Object.assign(this, partial);
    }
}
