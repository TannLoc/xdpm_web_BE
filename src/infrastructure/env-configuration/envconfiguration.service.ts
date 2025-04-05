import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class EnvConfigurationService {
    constructor(private readonly configService: ConfigService) {
    }

    getCallBackUrlVnPay(): string {
        return this.configService.get<string>('VNPAY_CALLBACK');
    }

    getUrlFeCallBaclPayment(): string {
        return this.configService.get<string>('FE_CALL_BACK_PAYMENT_URL');
    }

    //Get Config Cloudinary
    getCloudinaryCloudName(): string {
        return this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    }

    getCloudinaryApiKey(): string {
        return this.configService.get<string>('CLOUDINARY_APIKEY');
    }

    getCloudinaryApiSecret(): string {
        return this.configService.get<string>('CLOUDINARY_APISECRET');
    }

    getCloudinaryFolder(): string {
        return this.configService.get<string>('CLOUDINARY_FOLDER');
    }

    //Get Config Database
    getDatabaseType() {
        return this.configService.get<any>('DATABASE_TYPE');
    }

    getLogDatabaseURI() {
        return this.configService.get<any>('LOG_DATABASE_URI');
    }

    getLogDatabaseType() {
        return this.configService.get<any>('LOG_DATABASE_TYPE');
    }

    getLogDatabaseName(): string {
        return this.configService.get<string>('LOG_DATABASE_NAME');
    }

    getDatabaseHost(): string {
        return this.configService.get<string>('DATABASE_HOST');
    }

    getDatabasePort(): number {
        return this.configService.get<number>('DATABASE_PORT');
    }

    getDatabaseUsername(): string {
        return this.configService.get<string>('DATABASE_USERNAME');
    }

    getDatabasePassword(): string {
        return this.configService.get<string>('DATABASE_PASSWORD');
    }

    getDatabaseName(): string {
        return this.configService.get<string>('DATABASE_NAME');
    }

    getDatabaseSSLEnable(): boolean {
        const sslEnabled = this.configService.get<string>('DATABASE_SSL_ENABLED');
        return sslEnabled?.toLowerCase() === 'true';
    }

    getDatabaseSynchronize(): boolean {
        const synchronizeEnabled = this.configService.get<string>('DATABASE_SYNCHRONIZE');
        return synchronizeEnabled?.toLowerCase() === 'true';
    }

    getDatabaseLogEnable(): boolean {
        const synchronizeEnabled = this.configService.get<string>('DATABASE_LOGGING');
        return synchronizeEnabled?.toLowerCase() === 'true';
    }

    // Get Config Authentication
    getPublicKey(): string {
        return this.configService.get<string>('AUTH_JWT_ACCESS_PUBLICKEY');
    }

    getSecretKey(): string {
        return this.configService.get<string>('AUTH_JWT_REFRESH_SECRETKEY');
    }

    getAccessExpirationTime(): string {
        return this.configService.get<string>('AUTH_JWT_TOKEN_EXPIRES_IN');
    }

    getRefreshExpirationTime(): string {
        return this.configService.get<string>('AUTH_REFRESH_TOKEN_EXPIRES_IN');
    }

    //Send Mail
    getMailUser(): string {
        return this.configService.get<string>('MAIL_INCOMING_USER');
    }

    getMailPass(): string {
        return this.configService.get<string>('MAIL_INCOMING_PASS');
    }

    getMailHost(): string {
        return this.configService.get<string>('MAIL_INCOMING_HOST');
    }

    getMailPort(): number {
        return this.configService.get<number>('MAIL_INCOMING_PORT');
    }

    getMailOTPSubject(): string {
        return this.configService.get<string>('MAIL_OTP_SUBJECT');
    }

    getMailOtpTemplate(): string {
        return this.configService.get<string>('MAIL_OTP_TEMPLATE');
    }

    getVNPSecureSecret(): string {
        return this.configService.get<string>('VNPAY_SECURE_SECRET');
    }

    getVNPtmnCode(): string {
        return this.configService.get<string>('VNPAY_TMN_CODE');
    }
}
