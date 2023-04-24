import { Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { TicketMessageRepository } from "./repositories/ticket-message.repository";
import { TicketRepository } from "./repositories/ticket.repository";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { CreateTicketMessageDto } from "./dto/create-ticket-message.dto";
import { TicketStatus } from "./enums/ticket-status.enum";

@Injectable()
export class TicketsService {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly ticketMessageRepository: TicketMessageRepository,
    ) { }

    async create(createTicketDto: CreateTicketDto) {
        const ticket = await this.ticketRepository.save(createTicketDto);
        const message = this.ticketMessageRepository.create({
            message: createTicketDto.message,
            user: createTicketDto.user,
            ticket
        });
        return this.ticketMessageRepository.save(message);
    }

    findAll() {
        return this.ticketRepository.findAll();
    }

    findOne(id: number) {
        return this.ticketRepository.findOneById(id);
    }

    update(id: number, updateTicketDto: UpdateTicketDto) {
        return this.ticketRepository.update(id, updateTicketDto);
    }

    async createMessage(createTicketMessageDto: CreateTicketMessageDto) {
        if (createTicketMessageDto.close) {
            const ticket = this.ticketRepository.create({ status: TicketStatus.CLOSED });
            await this.update(createTicketMessageDto.ticket.id, ticket);
            createTicketMessageDto.ticket.status = TicketStatus.CLOSED;
        }
        const message = this.ticketMessageRepository.create(createTicketMessageDto);
        return this.ticketMessageRepository.save(message);
    }

    findAllMessages(ticketId: number) {
        return this.ticketMessageRepository.findAllByTicketId(ticketId);
    }
}