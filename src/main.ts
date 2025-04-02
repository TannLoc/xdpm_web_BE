import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import {BadRequestException, HttpExceptionFilter} from '@Infrastructure/exception';
import {RequestMethod, ValidationPipe} from '@nestjs/common';
import {LoggerService} from '@Infrastructure/service/logger';
import setupSwagger from '@Infrastructure/util/setup-swagger';
import {LoggerInterceptor} from '@Infrastructure/interceptor/logger.interceptor';
import {ValidationError} from "class-validator";
import {ErrorCode} from "@Domain/constants";

async function bootstrap() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

    // Filter
    app.useGlobalFilters(new HttpExceptionFilter(new LoggerService()));

    // Setup security headers
    app.use(helmet());
    

    //cookie
    app.use(cookieParser());

    //cors
    const corsOrigin = process.env.APP_CORS_ORIGIN;
    app.enableCors({
        origin: corsOrigin,
        methods: 'FIND,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    // Use global validation pipe for DTOs
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                const extractMessages = (errors: ValidationError[]): string[] => {
                    const messages: string[] = [];
                    errors.forEach(error => {
                        if (error.constraints) {
                            messages.push(...Object.values(error.constraints));
                        }
                        if (error.children && error.children.length > 0) {
                            messages.push(...extractMessages(error.children));
                        }
                    });
                    return messages;
                };

                const messages = extractMessages(validationErrors);

                return new BadRequestException(
                    'V000',
                    messages,
                );
            },
        }),
    );

    // Set a global API prefix
    const apiPrefix = process.env.API_PREFIX;
    app.setGlobalPrefix(apiPrefix, {
        exclude: [{path: '/', method: RequestMethod.GET}],
    });

    //swagger
        setupSwagger(app);

    // interceptors
    app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));

    const port = process.env.APP_PORT;
    await app.listen(port, () => {
        console.log(`Server starting on port ${port}`);
    });
}

bootstrap();
