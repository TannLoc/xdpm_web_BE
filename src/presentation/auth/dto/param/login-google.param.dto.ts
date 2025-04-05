import { ErrorCode } from "@Domain/constants";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginGoogleParamDto {
    @IsNotEmpty({message: ErrorCode.V062})
    @IsString({message: ErrorCode.V063})
    @ApiProperty({required: true})
    credential: string;
}