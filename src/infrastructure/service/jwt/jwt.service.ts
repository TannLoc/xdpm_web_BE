import {Injectable} from '@nestjs/common';
import {JwtService as JwtLibraryService} from '@nestjs/jwt';
import {EnvConfigurationService} from '@Infrastructure/env-configuration';
import {UnauthorizedException} from '@Infrastructure/exception';
import {ErrorCode} from '@Domain/constants';

interface DecodedJwtPayload {
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
}

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
    decodeJwtPayload(token: string): DecodedJwtPayload | null {
        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
            const payload = JSON.parse(payloadJson);
    
            return {
                sub: payload.sub,
                email: payload.email,
                email_verified: payload.email_verified,
                name: payload.name,
                given_name: payload.given_name,
                family_name: payload.family_name,
                picture: payload.picture
            } as DecodedJwtPayload;
        } catch (error) {
            console.error('Failed to decode JWT payload:', error);
            return null;
        }
    }
}
