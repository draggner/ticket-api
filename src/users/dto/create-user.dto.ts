import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Aires' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'aires@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'aires' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: '123' })
    @IsNotEmpty()
    password: string;
}
