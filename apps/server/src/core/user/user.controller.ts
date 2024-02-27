import { Role } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { CreateUserDTO } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(true, Role.ADMIN)
  @Get()
  async getUsers(@Query() params: GetUserParamsDto) {
    return this.userService.getUsers(params);
  }

  @HttpCode(HttpStatus.CREATED)
  @Auth(true, Role.ADMIN)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto);
  }

  @Auth(true, Role.ADMIN)
  @Patch('/ban/:id')
  async banOrUnbanUser(@Param('id') id: string, @User() user: UserEntity) {
    return this.userService.banOrUnbanUser(id, user.id);
  }
}
