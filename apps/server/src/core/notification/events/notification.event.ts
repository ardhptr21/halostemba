import { NotificationType } from '@halostemba/db';

export class NotificationEvent {
  constructor(
    public userId: string,
    public title: string,
    public type: NotificationType,
    public message?: string | null,
    public url?: string | null,
    public image?: string | null,
  ) {
    this.userId = userId;
    this.title = title;
    this.type = type;
    this.message = message;
    this.url = url;
    this.image = image;
  }
}
