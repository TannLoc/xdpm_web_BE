import {ResponseInterceptor} from '@Infrastructure/interceptor';
import {Module} from '@nestjs/common';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {AppController} from './app.controller';
import {EnvConfigurationModule} from '@Infrastructure/env-configuration';
import {ServiceModule} from '@Infrastructure/service/service.module';
import { RepositoryOrmModule } from '@Infrastructure/typeorm/postgres/imp-repository/postgres-repository.module';
import { AuthModule } from '@Presentation/auth/auth.module';


@Module({
    imports: [EnvConfigurationModule, ServiceModule,RepositoryOrmModule, AuthModule ],
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
