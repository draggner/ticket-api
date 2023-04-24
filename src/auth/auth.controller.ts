import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { SignInDto } from "./dto/sign-in.dto";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.singIn(signInDto);
    }
}