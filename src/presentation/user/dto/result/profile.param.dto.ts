import {ApiProperty} from '@nestjs/swagger';
import {CloudinaryResultDto} from '@Presentation/upload/dto/result';

export class ProfileResultDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    avatar: CloudinaryResultDto;

    @ApiProperty()
    birthday: Date;
}
