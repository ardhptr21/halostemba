import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async getCurrentUserTickets(userId: string) {
    const tickets = await this.ticketRepository.getListTicketByReporterId(
      userId,
    );

    return { data: tickets };
  }

  async createTicket(userId: string, createTicketDto: CreateTicketDto) {
    const ticket = await this.ticketRepository.createTicket({
      ...createTicketDto,
      reporterId: userId,
    });

    if (!ticket) throw new InternalServerErrorException('Create ticket failed');

    return { data: ticket };
  }

  async updateTicket(
    userId: string,
    ticketId: string,
    updateTicketDto: UpdateTicketDto,
  ) {
    const updated = this.ticketRepository.updateTicket({
      ...updateTicketDto,
      reporterId: userId,
      ticketId,
    });

    if (!updated) throw new InternalServerErrorException('Updat ticket failed');

    return { message: 'Update ticket successfully' };
  }

  async deleteTicket(ticketId: string, userId: string) {
    const ticket = await this.ticketRepository.deleteTicket(ticketId, userId);

    if (!ticket) throw new InternalServerErrorException('Delete ticket failed');

    return { message: 'Delete ticket successfully' };
  }
}
