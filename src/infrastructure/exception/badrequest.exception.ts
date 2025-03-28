import {HttpException, HttpStatus} from '@nestjs/common';

export class BadRequestException extends HttpException {
    constructor(code: string, message: string | string[]) {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                code: code,
                message: message,
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}
