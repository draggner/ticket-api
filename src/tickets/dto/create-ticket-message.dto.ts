import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { User } from "src/users/entities/user.entity";

export class CreateTicketMessageDto {
    @IsNotEmpty()
    @ApiProperty()
    message: string;

    @ApiProperty({ type: 'boolean' })
    @IsOptional()
    close?: boolean;

    user: User;

    ticket: Ticket;
}
