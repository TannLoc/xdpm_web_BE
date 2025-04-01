import {Global, Module} from '@nestjs/common';

import {BrandMapper} from './brand';
import { CloudinaryMapper } from './cloudinary';
import { PicklistMapper } from './picklist';
import { UserMapper } from './user';


@Global()
@Module({
    providers: [BrandMapper,CloudinaryMapper,PicklistMapper,UserMapper],
    exports: [BrandMapper,CloudinaryMapper,PicklistMapper,UserMapper],
})
export class MapperModule {
}
