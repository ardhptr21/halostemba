import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../ticket/ticket.repository';
import { UserEntity } from '@halostemba/entities';

@Injectable()
export class DashboardService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async getDashboardStatistics(user: UserEntity) {
    const ticketCount = await this.ticketRepository.ticketCountByStatus();
    const ticketStatistics =
      user.role === 'ADMIN'
        ? await this.ticketRepository.ticketStatistics()
        : await this.ticketRepository.ticketStatisticsResponded(user.id);

    return {
      ticket_count: ticketCount,
      ticket_statistics: ticketStatistics,
    };
  }
}
