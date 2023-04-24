import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TicketMessage } from "../entities/ticket-message.entity";

export class TicketMessageRepository extends Repository<TicketMessage> {
    readonly defaultOptions = {
        select: {
            id: true,
            message: true,
            createdAt: true,
            ticket: { status: true },
            user: { id: true, name: true }
        },
        relations: { ticket: true, user: true }
    };

    constructor(
        @InjectRepository(TicketMessage)
        private readonly ticketMessageRepository: Repository<TicketMessage>,
    ) {
        super(ticketMessageRepository.target, ticketMessageRepository.manager, ticketMessageRepository.queryRunner);
    }

    findOneById(id: number) {
        return this.ticketMessageRepository.findOne({ ...this.defaultOptions, where: { id } });
    }

    findAllByTicketId(ticketId: number) {
        return this.ticketMessageRepository.find({
            ...this.defaultOptions,
            where: { ticket: { id: ticketId } },
            order: { id: 'desc' }
        });
    }
}