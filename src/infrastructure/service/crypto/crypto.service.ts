import {Injectable} from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
    private readonly size = 6;

    constructor() {
    }

    generateOtp(): string {
        const max = Math.pow(10, this.size);
        const randomNumber = crypto.randomInt(0, max);
        return randomNumber.toString().padStart(this.size, '0');
    }
}
