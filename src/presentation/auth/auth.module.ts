import {Module} from '@nestjs/common';
import {AuthController, AuthManagementController} from './controller';
import {
    LoginByPhoneNumberUseCase,
    LoginByUsernameUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    RegisterUserUseCase
} from '@Application/usecases/auth';
import { LoginByGoogleUseCase } from '@Application/usecases/auth/login-by-google.usecase';

@Module({
    imports: [],
    controllers: [AuthController, AuthManagementController],
    providers: [LoginByGoogleUseCase,LoginByUsernameUseCase, LogoutUseCase, RefreshTokenUseCase, LoginByPhoneNumberUseCase, RegisterUserUseCase],
})
export class AuthModule {
}
