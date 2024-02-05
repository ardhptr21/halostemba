import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';

@Injectable()
export class NotificationRepository {
  constructor(private readonly db: DatabaseService) {}

  async getUserNotifications(userId: string) {
    return this.db.notification.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 90)),
        },
      },
      select: {
        id: true,
        title: true,
        message: true,
        read: true,
        type: true,
        url: true,
        createdAt: true,
      },
      orderBy: [{ read: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async readAllNotifications(userId: string) {
    return this.db.notification.updateMany({
      where: { userId },
      data: { read: true },
    });
  }
}
