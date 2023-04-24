import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { TicketRepository } from "./repositories/ticket.repository";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";
import { TicketMessage } from "./entities/ticket-message.entity";
import { TicketMessageRepository } from "./repositories/ticket-message.repository";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([
            Ticket,
            TicketMessage,
        ])
    ],
    controllers: [TicketsController],
    providers: [
        TicketsService,
        TicketRepository,
        TicketMessageRepository,
    ],
    exports: [
        TicketsService,
        TicketRepository,
        TicketMessageRepository,
    ],
})
export class TicketsModule { }