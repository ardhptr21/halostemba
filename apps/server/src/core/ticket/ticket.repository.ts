import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { TicketStatus } from '@halostemba/db';

@Injectable()
export class TicketRepository {
  constructor(private readonly db: DatabaseService) {}

  async getListTicketByReporterId(reporterId: string) {
    return await this.db.ticket.findMany({
      where: { reporterId },
      include: { responder: { select: { name: true, avatar: true } } },
    });
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

  async getTicketById(ticketId: string) {
    return await this.db.ticket.findFirst({ where: { id: ticketId } });
  }

  async updateTicketResponder(responderId: string, ticketId: string) {
    return await this.db.ticket.update({
      data: { responderId, status: TicketStatus.OPEN },
      where: { id: ticketId },
    });
  }

  async createTicketReply(ticketId: string, authorId: string, message: string) {
    return await this.db.ticketReply.create({
      data: { ticketId, authorId, message },
    });
  }

  async getTicketReplies(ticketId: string) {
    return await this.db.ticketReply.findMany({
      where: { ticketId },
      select: {
        id: true,
        authorId: true,
        message: true,
        createdAt: true,
        author: { select: { name: true, avatar: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async deleteTicketReply(replyId: string, authorId: string) {
    return await this.db.ticketReply.delete({
      where: { id: replyId, authorId },
    });
  }
}
