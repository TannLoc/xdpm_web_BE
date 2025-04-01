import {Global, Module} from '@nestjs/common';
import {PicklistMapper} from './picklist';
import {CloudinaryMapper} from './cloudinary';
import {BrandMapper} from './brand';
import {ProductMapper} from './product';
import {ShipmentMapper} from './shipment';
import {CartMapper} from './cart';
import {UserMapper} from '@Infrastructure/service/mapper/user';

@Global()
@Module({
    providers: [PicklistMapper, CloudinaryMapper, BrandMapper, ProductMapper, ShipmentMapper, CartMapper, UserMapper, ],
    exports: [PicklistMapper, CloudinaryMapper, BrandMapper, ProductMapper, ShipmentMapper, CartMapper, UserMapper, ],
})
export class MapperModule {
}
