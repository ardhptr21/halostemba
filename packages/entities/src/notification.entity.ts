enum NotificationType {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  DANGER = "DANGER",
}

enum NotificationIdentifier {
  COMMENT = "COMMENT",
  VOTE = "VOTE",
  TICKET = "TICKET",
  VERIFICATION = "VERIFICATION",
  WARNING = "WARNING",
}

export class NotificationEntity {
  id: string;
  userId: string;
  image?: string | null;
  title: string;
  message?: string | null;
  type: NotificationType;
  url: string;
  identifier?: NotificationIdentifier | null;
  read: boolean;
  createdAt: string;
}
