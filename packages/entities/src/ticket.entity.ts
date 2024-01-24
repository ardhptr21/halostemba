export class TicketEntity {
  id: string;
  reporterId: string;
  responderId: string;
  status: "WAITING" | "OPEN" | "CLOSED";
  title: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
}
