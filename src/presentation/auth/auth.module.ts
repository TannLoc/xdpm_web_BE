import {Module} from '@nestjs/common';
import {AuthController, AuthManagementController} from './controller';
import {
    LoginByPhoneNumberUseCase,
    LoginByUsernameUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    RegisterUserUseCase
} from '@Application/usecases/auth';

@Module({
    imports: [],
    controllers: [AuthController, AuthManagementController],
    providers: [LoginByUsernameUseCase, LogoutUseCase, RefreshTokenUseCase, LoginByPhoneNumberUseCase, RegisterUserUseCase],
})
export class AuthModule {
}
