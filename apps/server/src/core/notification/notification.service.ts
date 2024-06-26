import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(userId: string) {
    this.notificationRepository.readAllNotifications(userId);

    return this.notificationRepository.getUserNotifications(userId);
  }

  async unreadNotificationsCount(userId: string) {
    return {
      count: await this.notificationRepository.unreadNotificationsCount(userId),
    };
  }
}
