import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { Role } from '@halostemba/db';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { User } from '~/commons/decorators/requests/user.decorator';
import { UserEntity } from '@halostemba/entities';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(true, Role.ADMIN)
  @Get()
  async getUsers(@Query() params: GetUserParamsDto) {
    return this.userService.getUsers(params);
  }

  @Auth(true, Role.ADMIN)
  @Patch('/ban/:id')
  async banOrUnbanUser(@Param('id') id: string, @User() user: UserEntity) {
    return this.userService.banOrUnbanUser(id, user.id);
  }
}
