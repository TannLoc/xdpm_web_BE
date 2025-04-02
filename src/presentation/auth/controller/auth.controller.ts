import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Response} from 'express';

//Application
import {
    LoginByPhoneNumberUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    RegisterUserUseCase
} from '@Application/usecases/auth';

//Domain
import {AUTH_ROUTERS, UserRole} from '@Domain/constants';
import {JwtRefreshGuard} from '@Domain/guards';

//Infrastructure
import {ApiResponse, Roles} from '@Infrastructure/decorator';

//Dto
import {LoginCustomerParamDto, RegisterParamDto} from '../dto/param';
import {AuthResultDto} from '../dto/result';

@ApiTags('Auth Controller')
@Controller(AUTH_ROUTERS.CONTROLLER)
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUserUseCase,
        private readonly LoginByPhoneNumberUseCase: LoginByPhoneNumberUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly logoutUseCase: LogoutUseCase,
    ) {
    }

    //Register
    @Post(AUTH_ROUTERS.REGISTER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: AuthResultDto})
    async Register(@Body() param: RegisterParamDto, @Res({passthrough: true}) response: Response) {
        var result = await this.registerUseCase.execute(param);

        response.cookie('accessToken', result.accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
        });
        return result;
    }

    //Login
    @Post(AUTH_ROUTERS.LOGIN)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: AuthResultDto})
    async login(@Body() param: LoginCustomerParamDto, @Res({passthrough: true}) response: Response) {
        const result = await this.LoginByPhoneNumberUseCase.execute(param);
        response.cookie('accessToken', result.accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });
        return result;
    }

    //Refresh Token
    @Get(AUTH_ROUTERS.REFRESH_TOKEN)
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtRefreshGuard)
    @Roles(UserRole.CUSTOMER)
    @ApiResponse({type: AuthResultDto})
    async refreshToken(@Req() request: Request, @Res({passthrough: true}) response: Response){
        var payload = request['payload'];
        const result = await this.refreshTokenUseCase.execute(payload.userId);
        response.cookie('accessToken', result.accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });
        return result;
    }

    //Logout
    @Get(AUTH_ROUTERS.LOGOUT)
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtRefreshGuard)
    @Roles(UserRole.CUSTOMER)
    @ApiResponse({type: AuthResultDto})
    async logout(@Req() request: Request, @Res({passthrough: true}) response: Response) {
        var payload = request['payload'];
        var result = await this.logoutUseCase.execute(payload.userId);
        response.clearCookie('accessToken');
        return result;
    }
}
