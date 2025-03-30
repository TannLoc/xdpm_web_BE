import {ApiProperty} from '@nestjs/swagger';

export class SendOtpResultDto {
    @ApiProperty()
    result: boolean;

    constructor(partial: Partial<SendOtpResultDto>) {
        Object.assign(this, partial);
    }
}
