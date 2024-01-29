import { MediaEntity } from 'media.entity';
import { UserEntity } from 'user.entity';

export class TicketReplyEntity {
  id: string;
  authorId: string;
  ticketId: string;
  message: string;
  createdAt: string;
  author: Pick<UserEntity, 'name' | 'username' | 'avatar'>;
  medias?: MediaEntity[];
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
  responder?: Pick<UserEntity, 'name' | 'avatar' | 'username'>;
  medias?: MediaEntity[];
  ticketReplies?: TicketReplyEntity[];
}
