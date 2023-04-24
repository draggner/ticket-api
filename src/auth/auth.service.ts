import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async singIn(signInDto: SignInDto) {
        const user = await this.usersService.findByUsername(signInDto.username);
        if (!user) throw new UnauthorizedException(null, 'nome de usuário e/ou senha incorretos!');
        const match = await bcrypt.compare(signInDto.password, user.password);
        if (!match) throw new UnauthorizedException(null, 'nome de usuário e/ou senha incorretos!');
        const accessToken = await this.jwtService.signAsync({ id: user.id, username: user.username });
        return { accessToken };
    }
}