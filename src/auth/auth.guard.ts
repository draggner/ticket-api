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
            this.addUserPayload(context);
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
        const [type, token] = request.headers.authorization.split(' ') ?? [];
        const currentToken = type === 'Bearer' ? token : undefined;
        if (!currentToken) {
            throw new UnauthorizedException();
        }
        return currentToken;
    }

    async verifyToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT_SECRET') });
        } catch {
            throw new UnauthorizedException();
        }
    }

    async addUserPayload(context: ExecutionContextHost) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        const payload = await this.verifyToken(token);
        request['user'] = payload;
    }
}