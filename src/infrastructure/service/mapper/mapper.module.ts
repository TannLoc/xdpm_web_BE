import {Global, Module} from '@nestjs/common';

import {BrandMapper} from './brand';
import { CloudinaryMapper } from './cloudinary';


@Global()
@Module({
    providers: [BrandMapper,CloudinaryMapper],
    exports: [BrandMapper,CloudinaryMapper],
})
export class MapperModule {
}
