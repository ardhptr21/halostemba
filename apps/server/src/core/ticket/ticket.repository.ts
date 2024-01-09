import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';

@Injectable()
export class TicketRepository {
  constructor(private readonly db: DatabaseService) {}

  async getListTicketByReporterId(reporterId: string) {
    return await this.db.ticket.findMany({ where: { reporterId } });
  }

  async createTicket(data: CreateTicketDto & { reporterId: string }) {
    return await this.db.ticket.create({ data });
  }

  async updateTicket({
    ticketId: id,
    reporterId,
    ...data
  }: UpdateTicketDto & { ticketId: string; reporterId: string }) {
    return await this.db.ticket.update({ data, where: { id, reporterId } });
  }

  async deleteTicket(ticketId: string, reporterId: string) {
    return await this.db.ticket.delete({
      where: { id: ticketId, reporterId },
    });
  }
}
