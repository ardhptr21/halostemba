import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';

@Injectable()
export class DashboardRepository {
  constructor(private readonly db: DatabaseService) {}

  async overviewDataAdmin() {
    const totalUsers = await this.db.user.count();
    const totalTickets = await this.db.ticket.count();
    const totalMenfess = await this.db.menfess.count();

    return {
      total_users: totalUsers,
      total_tickets: totalTickets,
      total_menfess: totalMenfess,
    };
  }
}
