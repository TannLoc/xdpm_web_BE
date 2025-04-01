import {ResponseInterceptor} from '@Infrastructure/interceptor';
import {Module} from '@nestjs/common';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {AppController} from './app.controller';
import {EnvConfigurationModule} from '@Infrastructure/env-configuration';
import {ServiceModule} from '@Infrastructure/service/service.module';
import { RepositoryOrmModule } from '@Infrastructure/typeorm/postgres/imp-repository/postgres-repository.module';
import { AuthModule } from '@Presentation/auth/auth.module';
import { BrandModule } from '@Presentation/brand/brand.module';
import { MapperModule } from '@Infrastructure/service/mapper/mapper.module';
import { UploadModule } from '@Presentation/upload/upload.module';
import { PicklistModule } from '@Presentation/picklist/picklist.module';


@Module({
    imports: [EnvConfigurationModule,MapperModule, ServiceModule,RepositoryOrmModule, AuthModule,BrandModule,UploadModule,PicklistModule ],
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
