import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContextHost): Promise<boolean> {
        if (!this.isPublic(context)) {
            const request = context.switchToHttp().getRequest();
            const token = this.extractToken(request);
            const payload = await this.verifyToken(token);
            if (!token || !payload) throw new UnauthorizedException();
            request['user'] = payload;
        }
        return true;
    }

    isPublic(context: ExecutionContextHost) {
        return this.reflector.getAllAndOverride<boolean>(
            'isPublic',
            [
                context.getHandler(),
                context.getClass(),
            ]
        );
    }

    extractToken(request: Request): string {
        const { authorization } = request.headers;
        if (!authorization) {
            throw new UnauthorizedException();
        } else {
            const [type, token] = authorization.split(' ') ?? [];
            return type === 'Bearer' ? token : undefined;
        }
    }

    async verifyToken(token: string): Promise<any> {
        return await this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT_SECRET') });
    }
}