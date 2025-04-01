import {Module} from '@nestjs/common';
import {UploadUseCase} from '@Application/usecases/upload';
import {UploadController} from './upload.controller';

@Module({
    imports: [],
    controllers: [UploadController],
    providers: [UploadUseCase],
})
export class UploadModule {
}
