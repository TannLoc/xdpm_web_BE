import {Global, Module} from '@nestjs/common';
import {MapperModule} from './mapper/mapper.module';
import {JwtModule} from './jwt';
import {BcryptModule} from './bcrypt';
import {CloudinaryModule} from './cloudinary';
import {CryptoModule} from './crypto';

@Global()
@Module({
    imports: [MapperModule, JwtModule, BcryptModule, CloudinaryModule, CryptoModule],
    providers: [],
    exports: [],
})
export class ServiceModule {
}
