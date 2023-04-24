import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    findByUsername(username: string): Promise<User> {
        return this.userRepository.findOneBy({username});
    }
}