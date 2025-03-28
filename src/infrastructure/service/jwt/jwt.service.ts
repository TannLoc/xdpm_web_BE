import {Injectable} from '@nestjs/common';
import {JwtService as JwtLibraryService} from '@nestjs/jwt';
import {EnvConfigurationService} from '@Infrastructure/env-configuration';
import {UnauthorizedException} from '@Infrastructure/exception';
import {ErrorCode} from '@Domain/constants';

@Injectable()
export class JwtService {
    private readonly publicKey;
    private readonly secretKey;
    private readonly expiresIn;
    private readonly refreshExpiresIn;

    constructor(
        private readonly configService: EnvConfigurationService,
        private readonly jwtLibraryService: JwtLibraryService,
    ) {
        this.publicKey = configService.getPublicKey();
        this.secretKey = configService.getSecretKey();
        this.expiresIn = configService.getAccessExpirationTime();
        this.refreshExpiresIn = configService.getRefreshExpirationTime();
    }

    async generateAccessToken(payload: any): Promise<string> {
        return this.jwtLibraryService.sign(payload, {secret: this.publicKey, expiresIn: this.expiresIn});
    }

    async generateRefreshToken(payload: any): Promise<string> {
        return this.jwtLibraryService.sign(payload, {secret: this.secretKey, expiresIn: this.refreshExpiresIn});
    }

    async validateAccessToken(token: string): Promise<any> {
        return this.jwtLibraryService.verify<any>(token, {secret: this.publicKey});
    }

    async validateRefreshToken(token: string): Promise<any> {
        try {
            return this.jwtLibraryService.verify<any>(token, {secret: this.secretKey});
        } catch (err) {
            throw new UnauthorizedException('AUTH002', ErrorCode.AUTH002);
        }
    }

    async validAccessTokenHasExpired(token: string): Promise<any> {
        return this.jwtLibraryService.verify<any>(token, {
            secret: this.publicKey,
            ignoreExpiration: true,
        });
    }
}
