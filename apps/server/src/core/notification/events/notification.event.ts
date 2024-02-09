import {
  $Enums,
  NotificationIdentifier,
  NotificationType,
} from '@halostemba/db';

interface INotificationEvent {
  userId: string;
  title: string;
  type: NotificationType;
  url: string | null;
  message?: string | null;
  image?: string | null;
  identifier?: NotificationIdentifier | null;
}

export class NotificationEvent implements INotificationEvent {
  public userId: string;
  public title: string;
  public type: $Enums.NotificationType;
  public url: string;
  public message?: string;
  public image?: string;
  public identifier?: $Enums.NotificationIdentifier;

  constructor(data: INotificationEvent) {
    this.userId = data.userId;
    this.title = data.title;
    this.type = data.type;
    this.message = data.message;
    this.url = data.url;
    this.image = data.image;
    this.identifier = data.identifier;
  }
}
