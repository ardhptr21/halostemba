import { MediaEntity } from 'media.entity';

export class TicketReplyEntity {
  id: string;
  authorId: string;
  ticketId: string;
  message: string;
  createdAt: string;
}

export class TicketEntity {
  id: string;
  reporterId: string;
  responderId: string;
  status: 'WAITING' | 'OPEN' | 'CLOSED';
  title: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  medias?: MediaEntity[];
  ticketReplies?: TicketReplyEntity[];
}
