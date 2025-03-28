import {CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PAGINATION_RESPONSE_METADATA} from '../decorator/pagination.decorator';

export interface IPaginationResponse {
    page: number;
    pageSize: number;
    total: number;
    totalPage: number;
}

export interface IHttpSuccessResponse<T = any> {
    meta: {
        statusCode: number;
        message: string;
        pagination?: IPaginationResponse;
    };
    response: T | null;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<IHttpSuccessResponse<any>> {
        const handler = context.getHandler();
        const isPaginationResponse = this.reflector.get<boolean>(PAGINATION_RESPONSE_METADATA, handler);

        return next.handle().pipe(
            map((response) => {
                const res = context.switchToHttp().getResponse();

                const meta = {
                    statusCode: res.statusCode || HttpStatus.OK,
                    message: res.message || HttpStatus[res.statusCode || HttpStatus.OK],
                };

                if (isPaginationResponse) {
                    const {page, total, pageSize, data} = response;

                    const pagination: IPaginationResponse = {
                        page: Number(page),
                        pageSize: Number(pageSize),
                        total: Number(total),
                        totalPage: Math.ceil(total / pageSize),
                    };

                    return {
                        meta: {...meta, pagination},
                        response: data,
                    };
                }
                return {
                    meta,
                    response,
                };
            }),
        );
    }
}
