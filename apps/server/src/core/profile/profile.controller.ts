import { UserEntity } from '@halostemba/entities';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';

@Controller('profile')
export class ProfileController {
  @Auth(false)
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async getMe(@User() user: UserEntity) {
    return user;
  }
}
