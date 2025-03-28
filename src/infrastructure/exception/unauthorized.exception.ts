import {HttpException, HttpStatus} from '@nestjs/common';

export class UnauthorizedException extends HttpException {
    constructor(code: string, message: string) {
        super(
            {
                statusCode: HttpStatus.UNAUTHORIZED,
                code: code,
                message: message,
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
