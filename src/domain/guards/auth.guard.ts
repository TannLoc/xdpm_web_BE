import {ErrorCode, UserRole} from '@Domain/constants';
import {ROLES_KEY} from '@Infrastructure/decorator/roles.decorator';
import {ForbiddenException} from '@Infrastructure/exception';
import {UnauthorizedException} from '@Infrastructure/exception/unauthorized.exception';
import {JwtService} from '@Infrastructure/service/jwt';
import {UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private readonly userRepositoryOrm: UserRepositoryOrm,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            throw new UnauthorizedException('AUTH006', ErrorCode.AUTH006);
        }
        let payload;
        if (!token) {
            console.log("missing token")
            throw new UnauthorizedException('AUTH001', ErrorCode.AUTH001);
        }
        try {
            payload = await this.jwtService.validateAccessToken(token);
            request['payload'] = payload;
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('AUTH001', ErrorCode.AUTH001);
        }
        const user = await this.userRepositoryOrm.findOneById(payload.userId);

        if (!user) {
            throw new ForbiddenException('AUTH010', ErrorCode.AUTH010);
        }
        const hasRole = requiredRoles.some((role) => user.role?.includes(role));

        if (!hasRole) {
            throw new ForbiddenException('AUTH005', ErrorCode.AUTH005);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        return request.cookies['accessToken'];
    }
}
