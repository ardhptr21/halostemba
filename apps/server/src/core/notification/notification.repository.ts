import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { NotificationEvent } from './events/notification.event';

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
        image: true,
        createdAt: true,
      },
      orderBy: [{ read: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async readAllNotifications(userId: string) {
    return this.db.notification.updateMany({
      where: { userId },
      data: { read: true },
    });
  }

  async createNotification(data: NotificationEvent) {
    return this.db.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        url: data.url,
        image: data.image,
      },
    });
  }
}
