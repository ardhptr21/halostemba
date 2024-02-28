import { Prisma, TicketStatus } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEvent } from '../notification/events/notification.event';
import { UserRepository } from '../user/user.repository';
import { CreateTicketReplyDto } from './dtos/create-ticket-reply.dto';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { GetTicketRepliesParamsDto } from './dtos/get-ticket-replies-params.dto';
import { ListTicketParamsDto } from './dtos/list-ticket-params.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { TicketNotFoundException, TicketServerError } from './ticket.exception';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getCurrentUserTickets(userId: string, params: ListTicketParamsDto) {
    const tickets = await this.ticketRepository.getListTicketByReporterId(
      userId,
      params,
    );

    return { data: tickets };
  }

  async createTicket(userId: string, createTicketDto: CreateTicketDto) {
    const ticket = await this.ticketRepository.createTicket({
      ...createTicketDto,
      reporterId: userId,
    });

    if (!ticket) throw new TicketServerError('Gagal membuat laporan.');

    await this.notifyTeacher(ticket.id, {
      message: ticket.title,
      media: ticket.medias[0]?.source,
    });

    return { data: ticket };
  }

  async getTicketList(params: ListTicketParamsDto, user: UserEntity) {
    if (user.role === 'TEACHER') {
      return this.ticketRepository.getTicketListByResponderId(params, user.id, {
        status: params.status || undefined,
        title: params.search || undefined,
      });
    }

    return this.ticketRepository.getTicketList(params, {
      status: params.status || undefined,
      title: params.search || undefined,
    });
  }

  async getTicket(user: UserEntity, ticketId: string) {
    const ticket = await this.ticketRepository.getTicketByIdComplete(ticketId);

    if (!ticket) throw new TicketNotFoundException();

    if (user.role === 'ADMIN') return { data: ticket };

    if (
      (user.role === 'STUDENT' && ticket.reporterId !== user.id) ||
      (user.role === 'TEACHER' && ticket.responderId !== user.id)
    ) {
      throw new NotFoundException();
    }

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

    if (!updated) throw new TicketServerError('Gagal memperbarui laporan.');

    return { message: 'Berhasil memperbarui laporan.' };
  }

  async deleteTicket(ticketId: string, userId: string) {
    const ticket = await this.ticketRepository.deleteTicket(ticketId, userId);

    if (!ticket) throw new TicketServerError('Gagal menghapus laporan.');

    return { message: 'Berhasil menghapus laporan.' };
  }

  async responseTicket(ticketId: string, userId: string) {
    const ticket = await this.ticketRepository.getTicketById(ticketId);

    if (!ticket) throw new TicketNotFoundException();

    if (ticket.responderId)
      throw new ForbiddenException({
        error: 'Laporan sudah ditanggapi.',
        statusCode: 403,
      });

    const updated = await this.ticketRepository.updateTicketResponder(
      userId,
      ticketId,
    );

    if (!updated) throw new TicketServerError('Gagal menanggapi laporan.');

    this.ticketNotification(
      ticketId,
      ticket.reporterId,
      'Ticket Telah Direspon',
      `Selamat! Ticketmu telah direspon oleh ${updated.responder.name}.`,
    );

    return { message: 'Berhasil menanggapi laporan.' };
  }

  async createTicketReply(
    ticketId: string,
    userId: string,
    createTicketReplyDto: CreateTicketReplyDto,
  ) {
    const checkTicket = await this.ticketRepository.getTicketById(ticketId);

    if (!checkTicket) throw new TicketNotFoundException();

    if (checkTicket.reporterId !== userId && checkTicket.responderId !== userId)
      throw new TicketNotFoundException();

    if (checkTicket.status !== TicketStatus.OPEN)
      throw new BadRequestException({
        error: 'Laporan sudah ditutup atau belum ditanggapi.',
        statusCode: 400,
      });

    const ticket = await this.ticketRepository.createTicketReply(
      ticketId,
      userId,
      createTicketReplyDto,
    );

    if (!ticket) throw new TicketServerError('Gagal membuat balasan laporan.');

    return { data: ticket };
  }

  async getTicketReplies(
    ticketId: string,
    user: UserEntity,
    params: GetTicketRepliesParamsDto,
  ) {
    const ticket = await this.ticketRepository.getTicketById(ticketId);

    if (
      ticket.reporterId !== user.id &&
      ticket.responderId !== user.id &&
      user.role !== 'ADMIN'
    )
      throw new TicketNotFoundException();

    const replies = await this.ticketRepository.getTicketReplies(
      ticketId,
      params,
    );

    replies.data.reverse();

    return replies;
  }

  async deleteTicketReply(userId: string, replyId: string) {
    try {
      await this.ticketRepository.deleteTicketReply(replyId, userId);

      return { message: 'Berhasil menghapus balasan laporan.' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException({
          error: 'Balasan laporan tidak ditemukan.',
          statusCode: 404,
        });
      }

      throw new TicketServerError('Gagal menghapus balasan laporan.');
    }
  }

  async closeTicket(ticketId: string, userId: string) {
    const ticket = await this.ticketRepository.getTicketById(ticketId);
    const user = await this.userRepository.findUserById(userId);

    if (!ticket) throw new TicketNotFoundException();

    if (ticket.reporterId !== userId && ticket.responderId !== userId)
      throw new TicketNotFoundException();

    if (ticket.status !== TicketStatus.OPEN)
      throw new ForbiddenException({
        error: 'Hanya bisa menutup tiket dengan status OPEN.',
        statusCode: 403,
      });

    await this.ticketRepository.closeTicket(ticketId);

    this.ticketNotification(
      ticketId,
      ticket.reporterId,
      'Ticket Ditutup',
      `Ticket ${ticket.title} telah ditutup oleh ${user.name}.`,
    );

    return { message: 'Berhasil menutup laporan.' };
  }

  private ticketNotification(
    ticketId: string,
    userId: string,
    title: string,
    message: string,
  ) {
    this.eventEmitter.emit(
      'notification',
      new NotificationEvent({
        userId,
        title,
        type: 'SUCCESS',
        message,
        url: `/ticket/${ticketId}`,
        identifier: 'TICKET',
      }),
    );
  }

  private async notifyTeacher(
    ticketId: string,
    content: {
      message: string;
      media?: string;
    },
  ) {
    const teachers = await this.userRepository.getUserByRole('TEACHER');

    teachers.forEach((teacher) => {
      this.eventEmitter.emit(
        'notification',
        new NotificationEvent({
          userId: teacher.id,
          title: 'New Ticket',
          type: 'SUCCESS',
          message: content.message,
          url: `/ticket/${ticketId}`,
          image: content.media,
          identifier: 'TICKET',
        }),
      );
    });
  }
}
