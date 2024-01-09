import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
})
export class TicketModule {}
