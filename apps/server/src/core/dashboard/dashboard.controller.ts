import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { Role } from '@halostemba/db';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Auth(true, Role.ADMIN, Role.TEACHER)
  @Get()
  async getSatistic() {
    return this.dashboardService.getSatistic();
  }
}
