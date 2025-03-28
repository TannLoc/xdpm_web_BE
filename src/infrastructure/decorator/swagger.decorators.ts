import {applyDecorators, type Type} from '@nestjs/common';
import {ApiExtraModels, ApiOkResponse, ApiProperty, type ApiResponseOptions, getSchemaPath} from '@nestjs/swagger';

export class PaginationMetaDto {
    @ApiProperty({required: true})
    page: number;
    @ApiProperty({required: true})
    pageSize: number;
    @ApiProperty({required: true})
    total: number;
    @ApiProperty({required: true})
    totalPage: number;
}

export class MetaDto {
    @ApiProperty({required: true})
    statusCode: number;
    @ApiProperty({required: true})
    message: string;
}

export class ApiResponseDto<T> {
    @ApiProperty({required: true})
    meta: MetaDto;
    @ApiProperty({required: true})
    response: T | T[]; // Allow for both single and array responses
}

class CustomApiResponseOptions {
    type: any;
    description?: string;
    isPaginated?: boolean;
}

export const ApiResponse = <T extends Type<any>>(options: CustomApiResponseOptions): MethodDecorator => {
    const {isPaginated = false} = options;
    return applyDecorators(
        ApiExtraModels(MetaDto, PaginationMetaDto, ApiResponseDto, options.type),
        ApiOkResponse({
            description: options.description || `Response for ${options.type.name}`,
            schema: {
                title: `${options.isPaginated ? 'Paginated' : 'Single'}ResponseOf${options.type.name}`,
                allOf: [
                    {
                        $ref: getSchemaPath(ApiResponseDto),
                    },
                    {
                        properties: {
                            meta: {
                                type: 'object',
                                properties: {
                                    statusCode: {type: 'integer'},
                                    message: {type: 'string'},
                                    ...(isPaginated == true
                                        ? {
                                            pagination: {
                                                type: 'object',
                                                properties: {
                                                    page: {type: 'integer'},
                                                    pageSize: {type: 'integer'},
                                                    total: {type: 'integer'},
                                                    totalPage: {type: 'integer'},
                                                },
                                            },
                                        }
                                        : {}),
                                },
                            },
                            response: options.isPaginated
                                ? {
                                    type: 'array',
                                    items: {$ref: getSchemaPath(options.type)},
                                }
                                : {$ref: getSchemaPath(options.type)},
                        },
                    },
                ],
            },
        } as ApiResponseOptions | undefined),
    );
};
