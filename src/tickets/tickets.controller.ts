import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Req, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/users/users.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { TicketsService } from "./tickets.service";
import { CreateTicketMessageDto } from "./dto/create-ticket-message.dto";
import { TicketStatus } from "./enums/ticket-status.enum";
import { UpdateTicketDto } from "./dto/update-ticket.dto";

@Controller('tickets')
@ApiTags('Tickets')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class TicketsController {
    constructor(
        private readonly ticketsService: TicketsService,
        private readonly usersService: UsersService,
    ) { }

    @Post()
    create(@Body() createTicketDto: CreateTicketDto, @Req() request) {
        createTicketDto.user = request.user;
        return this.ticketsService.create(createTicketDto);
    }

    @Get()
    findAll() {
        return this.ticketsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.ticketsService.findOne(id);
    }

    @Post(':id/messages')
    async createMessage(@Param('id') id: number, @Body() createTicketMessageDto: CreateTicketMessageDto, @Req() request) {
        createTicketMessageDto.ticket = await this.ticketsService.findOne(id);
        createTicketMessageDto.user = await this.usersService.findById(request.user.id);
        return this.ticketsService.createMessage(createTicketMessageDto);
    }

    @Get(':id/messages')
    findAllMessages(@Param('id') id: number) {
        return this.ticketsService.findAllMessages(id);
    }
}