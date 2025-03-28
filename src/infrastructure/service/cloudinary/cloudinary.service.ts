import {Injectable} from '@nestjs/common';
import {UploadApiErrorResponse, UploadApiResponse, v2} from 'cloudinary';
import {EnvConfigurationService} from '@Infrastructure/env-configuration';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
    constructor(private readonly configService: EnvConfigurationService) {
    }

    async upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        var folder = this.configService.getCloudinaryFolder();
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({folder, public_id: Date.now().toString()}, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }
}
