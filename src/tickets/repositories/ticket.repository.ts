import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticket } from "../entities/ticket.entity";

export class TicketRepository extends Repository<Ticket> {
    readonly defaultOptions = {
        select: {
            user: { id: true, name: true }
        },
        relations: { user: true }
    };

    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>
    ) {
        super(ticketRepository.target, ticketRepository.manager, ticketRepository.queryRunner);
    }

    findAll() {
        return this.ticketRepository.find({ ...this.defaultOptions, order: { id: 'desc' } });
    }

    findOneById(id: number) {
        return this.ticketRepository.findOne({ ...this.defaultOptions, where: { id } });
    }
}