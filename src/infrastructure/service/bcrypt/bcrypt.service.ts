import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    private readonly saltRounds = 10;

    constructor() {
    }

    async hash(param: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(param, this.saltRounds);
    }

    async compare(param: string, hashedparam: string): Promise<boolean> {
        return await bcrypt.compare(param, hashedparam);
    }
}
