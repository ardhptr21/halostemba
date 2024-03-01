import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationEvent } from '../events/notification.event';
import { NotificationRepository } from '../notification.repository';

@Injectable()
export class NotificationListener {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @OnEvent('notification')
  handleNotification(event: NotificationEvent) {
    return this.notificationRepository.createNotification(event);
  }
}
