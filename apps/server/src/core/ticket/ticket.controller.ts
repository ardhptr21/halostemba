import { Role } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { CreateTicketReplyDto } from './dtos/create-ticket-reply.dto';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { ListTicketParamsDto } from './dtos/list-ticket-params.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Auth(true, Role.STUDENT)
  @Post('/')
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @User() user: UserEntity,
  ) {
    return this.ticketService.createTicket(user.id, createTicketDto);
  }

  @Auth(true, Role.STUDENT)
  @Get('/me')
  async getCurrentUserTickets(
    @User() user: UserEntity,
    @Query() params: ListTicketParamsDto,
  ) {
    return this.ticketService.getCurrentUserTickets(user.id, params);
  }

  @Auth(true, Role.TEACHER, Role.STUDENT)
  @Get('/:ticketId')
  async getTicket(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @User() user: UserEntity,
  ) {
    return this.ticketService.getTicket(user, ticketId);
  }

  @Auth(true, Role.STUDENT)
  @Put('/:ticketId')
  async updateTicket(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @User() user: UserEntity,
  ) {
    return this.ticketService.updateTicket(user.id, ticketId, updateTicketDto);
  }

  @Auth(true, Role.STUDENT)
  @Delete('/:ticketId')
  async deleteTicket(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @User() user: UserEntity,
  ) {
    return this.ticketService.deleteTicket(ticketId, user.id);
  }

  @Auth(true, Role.TEACHER)
  @Patch('/:ticketId/respond')
  async responseTicket(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @User() user: UserEntity,
  ) {
    return this.ticketService.responseTicket(ticketId, user.id);
  }

  @Auth(true, Role.TEACHER, Role.STUDENT)
  @Post('/:ticketId/replies')
  async createTicketReply(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @Body() createTicketReplyDto: CreateTicketReplyDto,
    @User() user: UserEntity,
  ) {
    return this.ticketService.createTicketReply(
      ticketId,
      user.id,
      createTicketReplyDto.message,
    );
  }

  @Auth(true, Role.TEACHER, Role.STUDENT)
  @Get('/:ticketId/replies')
  async getTicketReplies(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @User() user: UserEntity,
  ) {
    return this.ticketService.getTicketReplies(ticketId, user.id);
  }

  @Auth(true, Role.TEACHER, Role.STUDENT)
  @Delete('/replies/:replyId')
  async deleteTicketReply(
    @Param('replyId') replyId: string,
    @User() user: UserEntity,
  ) {
    return this.ticketService.deleteTicketReply(user.id, replyId);
  }
}
