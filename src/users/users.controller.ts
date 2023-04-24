import { BadRequestException, Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Public } from "src/auth/decorators/public.decorator";

@Controller('users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Public()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            console.log(createUserDto);
            return await this.usersService.create(createUserDto);
        } catch(error) {
            throw new BadRequestException();
        }
    }
}