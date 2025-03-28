import {Global, Module} from '@nestjs/common';
import {EnvConfigurationService} from './envconfiguration.service';
import {ConfigModule} from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.development',
            cache: true,
            expandVariables: true,
        }),
    ],
    providers: [EnvConfigurationService],
    exports: [EnvConfigurationService],
})
export class EnvConfigurationModule {
}
