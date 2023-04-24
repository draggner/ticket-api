import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async generatePasswordHash() {
        if (this.password) {
            this.password = await bcrypt.hashSync(this.password, 10);
        }
    }
}
