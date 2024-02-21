import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TicketRepository } from '../ticket/ticket.repository';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, TicketRepository],
})
export class DashboardModule {}
