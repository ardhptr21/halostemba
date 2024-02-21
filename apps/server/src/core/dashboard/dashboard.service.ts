import { Role } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../ticket/ticket.repository';
import { DashboardRepository } from './dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  async getDashboardStatistics(user: UserEntity) {
    if (user.role === Role.TEACHER) {
      return this.getDashboardStatisticsTeacher(user);
    }

    return this.getDashboardStatisticsAdmin();
  }

  async getDashboardStatisticsTeacher(user: UserEntity) {
    const ticketCount = await this.ticketRepository.ticketCountByStatus();
    const ticketStatistics =
      await this.ticketRepository.ticketStatisticsResponded(user.id);

    return {
      ticket_count: ticketCount,
      ticket_statistics: ticketStatistics,
    };
  }

  async getDashboardStatisticsAdmin() {
    const ticketStatistics = await this.ticketRepository.ticketStatistics();
    const dataStatistics = await this.dashboardRepository.overviewDataAdmin();

    return {
      ticket_statistics: ticketStatistics,
      ...dataStatistics,
    };
  }
}
