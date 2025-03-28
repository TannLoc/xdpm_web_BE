import {ResponseInterceptor} from '@Infrastructure/interceptor';
import {Module} from '@nestjs/common';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {AppController} from './app.controller';
import {EnvConfigurationModule} from '@Infrastructure/env-configuration';
import {ServiceModule} from '@Infrastructure/service/service.module';


@Module({
    imports: [EnvConfigurationModule, ServiceModule, ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
    ],
})
export class AppModule {
}
