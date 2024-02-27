export interface DashboardStatisticsEntity {
  ticket_count: {
    waiting?: number;
    open?: number;
    closed?: number;
  };
  ticket_statistics: {
    date: string;
    count: number;
  }[];
  total_users: number;
  total_tickets: number;
  total_menfess: number;
}
