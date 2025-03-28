import {ConfigOptions, v2 as cloudinary} from 'cloudinary';
import {CLOUDINARY} from './cloudinary.constants';
import {EnvConfigurationService} from '@Infrastructure/env-configuration';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: (configService: EnvConfigurationService): ConfigOptions => {
        return cloudinary.config({
            cloud_name: configService.getCloudinaryCloudName(),
            api_key: configService.getCloudinaryApiKey(),
            api_secret: configService.getCloudinaryApiSecret(),
        });
    },
    inject: [EnvConfigurationService],
};
