import {Global, Module} from '@nestjs/common';
import {CloudinaryProvider} from './cloudinary.provider';
import {CloudinaryService} from './cloudinary.service';

@Global()
@Module({
    imports: [],
    providers: [CloudinaryService, CloudinaryProvider],
    exports: [CloudinaryService],
})
export class CloudinaryModule {
}
