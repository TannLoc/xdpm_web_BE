import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class SetActiveBrandParamDto {
    @IsNotEmpty({message: ErrorCode.V026})
    @ApiProperty({required: true})
    isActive: boolean;
}
