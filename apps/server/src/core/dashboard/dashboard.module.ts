import { Module } from '@nestjs/common';
import { TicketRepository } from '../ticket/ticket.repository';
import { DashboardController } from './dashboard.controller';
import { DashboardRepository } from './dashboard.repository';
import { DashboardService } from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository, TicketRepository],
})
export class DashboardModule {}
