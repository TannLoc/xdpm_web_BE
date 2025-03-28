import {Global, Module} from '@nestjs/common';
import {CryptoService} from './crypto.service';

@Global()
@Module({
    imports: [],
    providers: [CryptoService],
    exports: [CryptoService],
})
export class CryptoModule {
}
