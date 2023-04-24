import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    create(createUserDto: CreateUserDto) {//}: Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    findByUsername(username: string): Promise<User> {
        return this.userRepository.findByUsername(username);
    }

    findById(id: number): Promise<User> {
        return this.userRepository.findById(id);
    }
}
