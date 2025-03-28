import {LoggerService} from '@Infrastructure/service/logger';
import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';

interface IError {
    message: string;
    code_error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {
    }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const exceptionResponse = exception.getResponse() as
            | {
            statusCode: number;
            error: string;
            code: string;
            message: string;
        }
            | string; // Sometimes `getResponse` returns a string for default errors

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        // Check if `exceptionResponse` is an object with `code` and `message`
        const code = typeof exceptionResponse === 'object' && 'code' in exceptionResponse ? exceptionResponse.code : 'UNKNOWN_ERROR';

        const message = typeof exceptionResponse === 'object' && 'message' in exceptionResponse ? exceptionResponse.message : exception.message;

        this.logMessage(request, {message: message, code_error: code}, status, exception);

        response.status(status).json({
            data: null,
            meta: {
                statusCode: status,
                error: {
                    code: code,
                    message: message,
                },
            },
        });
    }

    private logMessage(request: any, message: IError, status: number, exception: any) {
        if (status === 500) {
            this.logger.error(
                `End Request on ${request.path}`,
                `method=${request.method} status=${status} code=${message.code_error ? message.code_error : null} message=${message.message ? message.message : null}`,
                status >= 500 ? exception.stack : '',
            );
        } else {
            this.logger.warn(
                `End Request on ${request.path}`,
                `method=${request.method} status=${status} code=${message.code_error ? message.code_error : null} message=${message.message ? message.message : null}`,
            );
        }
    }
}
