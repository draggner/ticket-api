import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity()
export class TicketMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Ticket, { nullable: false })
    @JoinColumn({ name: 'ticket_id', referencedColumnName: 'id' })
    ticket: Ticket;

    @Column()
    message: string;

    @CreateDateColumn()
    createdAt: Date;
}