import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { ListNotificationParamsDto } from './dto/list-notification-params.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(userId: string, params: ListNotificationParamsDto) {
    return this.notificationRepository.getUserNotifications(userId, params);
  }
}
