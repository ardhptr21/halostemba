import { Role } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Auth(Role.STUDENT)
  @Post('/')
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @User() user: UserEntity,
  ) {
    return this.ticketService.createTicket(user.id, createTicketDto);
  }

  @Auth(Role.STUDENT)
  @Get('/me')
  async getCurrentUserTickets(@User() user: UserEntity) {
    return this.ticketService.getCurrentUserTickets(user.id);
  }

  @Auth(Role.STUDENT)
  @Put('/:ticketId')
  async updateTicket(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @User() user: UserEntity,
  ) {
    return this.ticketService.updateTicket(user.id, ticketId, updateTicketDto);
  }

  @Auth(Role.STUDENT)
  @Delete('/:ticketId')
  async deleteTicket(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @User() user: UserEntity,
  ) {
    return this.ticketService.deleteTicket(ticketId, user.id);
  }
}
