import { Injectable } from '@nestjs/common';
import { subDays } from 'date-fns';
import { DatabaseService } from '~/providers/database/database.service';
import { NotificationEvent } from './events/notification.event';

@Injectable()
export class NotificationRepository {
  constructor(private readonly db: DatabaseService) {}

  async getUserNotifications(userId: string) {
    return this.db.notification.findMany({
      where: {
        userId,
        createdAt: { gte: subDays(new Date(), 90) },
      },
      orderBy: [{ read: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async readAllNotifications(userId: string) {
    return this.db.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  async createNotification(data: NotificationEvent) {
    return this.db.notification.create({ data });
  }
}
