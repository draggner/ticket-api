import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ConfigurationsModule } from "src/configurations/configuration.module";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigurationsModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: configService.get<boolean>('JWT_GLOBAL', true),
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d')
                },
            }),
        })
    ],
    exports: [AuthService],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
    controllers: [AuthController],
})
export class AuthModule { }