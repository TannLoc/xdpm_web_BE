import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {Response} from 'express';
import {ApiTags} from '@nestjs/swagger';

//Application
import {LoginByUsernameUseCase, LogoutUseCase, RefreshTokenUseCase} from '@Application/usecases/auth';

//Domain
import {AUTH_ROUTERS, GENERIC_PATH, UserRole} from '@Domain/constants';
import {JwtRefreshGuard} from '@Domain/guards';

//Infrastructure
import {ApiResponse, Roles} from '@Infrastructure/decorator';

//Dto
import {LoginEmployeeParamDto} from '../dto/param';
import {AuthResultDto} from '../dto/result';

@ApiTags('Auth Management Controller')
@Controller(`${GENERIC_PATH.MANAGEMENT}/${AUTH_ROUTERS.CONTROLLER}`)
export class AuthManagementController {
    constructor(
        private readonly loginEmployeeUseCase: LoginByUsernameUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly logoutUseCase: LogoutUseCase,
    ) {
    }

    //Login
    @Post(AUTH_ROUTERS.LOGIN)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: AuthResultDto})
    async login(@Body() param: LoginEmployeeParamDto, @Res({passthrough: true}) response: Response) {
        const result = await this.loginEmployeeUseCase.execute(param);
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
    @Roles(UserRole.ADMIN)
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
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: AuthResultDto})
    async logout(@Req() request: Request, @Res({passthrough: true}) response: Response) {
        var payload = request['payload'];
        var result = await this.logoutUseCase.execute(payload.userId);
        response.clearCookie('accessToken');
        return result;
    }
}
