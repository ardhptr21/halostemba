import { Controller, Get, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { User } from '~/commons/decorators/requests/user.decorator';
import { UserEntity } from '@halostemba/entities';
import { ListNotificationParamsDto } from './dto/list-notification-params.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Auth(false)
  @Get('/')
  async getUserNotifications(
    @User() user: UserEntity,
    @Query() params: ListNotificationParamsDto,
  ) {
    return this.notificationService.getNotifications(user.id, params);
  }
}
