import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'aires' })
    @IsNotEmpty({ message: 'Nome de usuário não informado.' })
    username: string;

    @ApiProperty({ example: '123' })
    @IsNotEmpty({ message: 'Senha não informada.' })
    password: string;
}