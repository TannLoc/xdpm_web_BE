import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {EnvConfigurationModule, EnvConfigurationService} from '@Infrastructure/env-configuration';

export const getPostgresModuleOptions = (config: EnvConfigurationService): TypeOrmModuleOptions =>
    ({
        type: config.getDatabaseType(),
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUsername(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
        entities: [__dirname + './../../../../**/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: config.getDatabaseSynchronize(),
        ssl: config.getDatabaseSSLEnable(),
        logging: config.getDatabaseLogEnable(),
    }) as TypeOrmModuleOptions;

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvConfigurationModule],
            inject: [EnvConfigurationService],
            useFactory: getPostgresModuleOptions,
        }),
    ],
})
export class PostgresModule {
}
