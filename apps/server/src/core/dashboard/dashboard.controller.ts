import { Role } from '@halostemba/db';
import { Controller, Get } from '@nestjs/common';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { DashboardService } from './dashboard.service';
import { User } from '~/commons/decorators/requests/user.decorator';
import { UserEntity } from '@halostemba/entities';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Auth(true, Role.ADMIN, Role.TEACHER)
  @Get('/')
  async getDashboardStatistics(@User() user: UserEntity) {
    return this.dashboardService.getDashboardStatistics(user);
  }
}
