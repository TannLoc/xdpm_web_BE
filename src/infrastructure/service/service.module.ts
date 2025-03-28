import {Global, Module} from '@nestjs/common';
import {JwtModule} from './jwt';
import {BcryptModule} from './bcrypt';
import {CloudinaryModule} from './cloudinary';
import {CryptoModule} from './crypto';

@Global()
@Module({
    imports: [JwtModule, BcryptModule, CloudinaryModule, CryptoModule],
    providers: [],
    exports: [],
})
export class ServiceModule {
}
