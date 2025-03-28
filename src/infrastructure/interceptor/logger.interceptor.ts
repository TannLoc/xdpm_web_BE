import {LoggerService} from '@Infrastructure/service/logger';
import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        const ip = this.getIP(request);

        this.logger.log(`Income Request on ${request.path}`, `method=${request.method} ip=${ip} TimeRequest = ${new Date().toLocaleString()}`);

        return next.handle().pipe(
            tap(() => {
                this.logger.log(`End Request on ${request.path}`, `method=${request.method} ip=${ip} TimeResponse = ${new Date().toLocaleString()} duration=${Date.now() - now}ms`);
            }),
        );
    }

    private getIP(request: any): string {
        let ip: string;
        const ipAddr = request.headers['x-forwarded-for'];
        if (ipAddr) {
            const list = ipAddr.split(',');
            ip = list[list.length - 1];
        } else {
            ip = request.connection.remoteAddress;
        }
        return ip.replace('::ffff:', '');
    }
}
