import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { TicketRepository } from './ticket.repository';
import { Prisma, TicketStatus } from '@halostemba/db';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async getCurrentUserTickets(userId: string) {
    const tickets =
      await this.ticketRepository.getListTicketByReporterId(userId);

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

  async responseTicket(ticketId: string, userId: string) {
    const ticket = await this.ticketRepository.getTicketById(ticketId);

    if (!ticket) throw new InternalServerErrorException('Ticket not found');

    if (ticket.responderId)
      throw new InternalServerErrorException('Ticket already responded');

    const updated = await this.ticketRepository.updateTicketResponder(
      userId,
      ticketId,
    );

    if (!updated)
      throw new InternalServerErrorException('Response ticket failed');

    return { message: 'Response ticket successfully' };
  }

  async createTicketReply(ticketId: string, userId: string, message: string) {
    const checkTicket = await this.ticketRepository.getTicketById(ticketId);

    if (!checkTicket) throw new NotFoundException('Ticket not found');

    if (checkTicket.reporterId !== userId && checkTicket.responderId !== userId)
      throw new NotFoundException('Ticket not found');

    if (checkTicket.status !== TicketStatus.OPEN)
      throw new BadRequestException('Ticket already closed or still pending');

    const ticket = await this.ticketRepository.createTicketReply(
      ticketId,
      userId,
      message,
    );

    if (!ticket)
      throw new InternalServerErrorException('Create ticket reply failed');

    return { data: ticket };
  }

  async getTicketReplies(ticketId: string, userId: string) {
    const ticket = await this.ticketRepository.getTicketById(ticketId);

    if (ticket.reporterId !== userId && ticket.responderId !== userId)
      throw new NotFoundException('Ticket not found');

    const replies = await this.ticketRepository.getTicketReplies(ticketId);

    return { data: replies };
  }

  async deleteTicketReply(userId: string, replyId: string) {
    try {
      await this.ticketRepository.deleteTicketReply(replyId, userId);

      return { message: 'Delete ticket reply successfully' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Ticket reply not found');
      }

      throw new InternalServerErrorException('Delete ticket reply failed');
    }
  }
}
