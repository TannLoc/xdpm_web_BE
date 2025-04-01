import {Global, Module} from '@nestjs/common';

import {BrandMapper} from './brand';
import { CloudinaryMapper } from './cloudinary';
import { PicklistMapper } from './picklist';


@Global()
@Module({
    providers: [BrandMapper,CloudinaryMapper,PicklistMapper],
    exports: [BrandMapper,CloudinaryMapper,PicklistMapper],
})
export class MapperModule {
}
