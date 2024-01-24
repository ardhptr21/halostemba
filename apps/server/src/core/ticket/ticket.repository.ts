import { TicketStatus } from '@halostemba/db';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { ListTicketParamsDto } from './dtos/list-ticket-params.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';

@Injectable()
export class TicketRepository {
  constructor(private readonly db: DatabaseService) {}

  async getListTicketByReporterId(
    reporterId: string,
    params: ListTicketParamsDto,
  ) {
    return await this.db.ticket.findMany({
      where: {
        reporterId,
        status: params.status,
      },
      include: {
        responder: { select: { name: true, avatar: true } },
        ticketReplies: { take: 1, orderBy: { createdAt: 'desc' } },
        medias: { select: { source: true, type: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createTicket({
    media,
    ...data
  }: CreateTicketDto & { reporterId: string }) {
    return await this.db.ticket.create({
      data: {
        ...data,
        medias: { create: media },
      },
    });
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

  async getTicketByIdComplete(ticketId: string) {
    return await this.db.ticket.findFirst({
      where: { id: ticketId },
      include: {
        medias: { select: { source: true, type: true } },
        responder: { select: { name: true, avatar: true, username: true } },
      },
    });
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
