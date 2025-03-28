import {HttpException, HttpStatus} from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor(code: string, message: string) {
        super(
            {
                statusCode: HttpStatus.FORBIDDEN,
                code: code,
                message: message,
            },
            HttpStatus.FORBIDDEN,
        );
    }
}
