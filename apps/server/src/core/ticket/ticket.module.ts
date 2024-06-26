import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketRepository, UserRepository],
})
export class TicketModule {}
