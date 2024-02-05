import { Prisma } from '@halostemba/db';
import { Injectable } from '@nestjs/common';
import { paginator } from '~/providers/database/database.paginator';
import { DatabaseService } from '~/providers/database/database.service';
import { ListNotificationParamsDto } from './dto/list-notification-params.dto';

const paginate = paginator({ perPage: 10 });

@Injectable()
export class NotificationRepository {
  constructor(private readonly db: DatabaseService) {}

  async getUserNotifications(
    userId: string,
    params: ListNotificationParamsDto,
  ) {
    return await paginate<any, Prisma.NotificationFindManyArgs>(
      this.db.notification,
      {
        where: { userId },
        select: {
          id: true,
          title: true,
          message: true,
          read: true,
          type: true,
          url: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      },
      {
        page: params.page,
        perPage: params.perPage,
      },
    );
  }
}
