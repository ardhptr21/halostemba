import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../ticket/ticket.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async getSatistic() {
    const countData = await this.ticketRepository.ticketCount();

    return {
      ticketCount: this.transformTicketCount(countData),
    };
  }

  transformTicketCount(ticketCountData: any[]) {
    let ticketCount = {
      waiting: 0,
      open: 0,
      closed: 0,
    };

    ticketCountData.forEach((ticket) => {
      switch (ticket.status) {
        case 'WAITING':
          ticketCount.waiting += ticket._count.id;
          break;
        case 'OPEN':
          ticketCount.open += ticket._count.id;
          break;
        case 'CLOSED':
          ticketCount.closed += ticket._count.id;
          break;
        default:
          break;
      }
    });

    return ticketCount;
  }
}
