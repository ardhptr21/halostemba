import { NotificationType } from '@halostemba/db';

export class NotificationEvent {
  userId: string;
  image?: string | null;
  title: string;
  message?: string | null;
  type: NotificationType;
  url?: string | null;
}
