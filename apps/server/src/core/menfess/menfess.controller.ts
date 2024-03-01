import { Role } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { ParseUserInterceptor } from '~/commons/interceptors/parse-user.interceptor';
import { CreateMenfessDto } from './dtos/create-menfess.dto';
import { ListMenfessParamsDto } from './dtos/list-menfess-params.dto';
import { MenfessService } from './menfess.service';

@Controller('menfess')
export class MenfessController {
  constructor(private readonly menfessService: MenfessService) {}

  @UseInterceptors(ParseUserInterceptor)
  @Get('/')
  getListMenfess(
    @User() user: UserEntity,
    @Query() params: ListMenfessParamsDto,
  ) {
    return this.menfessService.getListMenfess(user, params);
  }

  @UseInterceptors(ParseUserInterceptor)
  @Get('/users/:username')
  getUserMenfess(
    @Param('username') username: string,
    @User() user?: UserEntity,
  ) {
    return this.menfessService.getUserMenfess(username, user);
  }

  @UseInterceptors(ParseUserInterceptor)
  @Get('/popular')
  getListPopularMenfess(
    @User() user: UserEntity,
    @Query() params: ListMenfessParamsDto,
  ) {
    return this.menfessService.getListPopularMenfess(user, params);
  }

  @Auth(true, Role.STUDENT)
  @Post('/')
  createMenfess(
    @Body() createMenfessDto: CreateMenfessDto,
    @User() user: UserEntity,
  ) {
    return this.menfessService.createMenfess(createMenfessDto, user.id);
  }

  @UseInterceptors(ParseUserInterceptor)
  @Get('/:menfessId')
  getMenfess(
    @Param('menfessId', ParseUUIDPipe) menfessId: string,
    @User() user: UserEntity,
  ) {
    return this.menfessService.getMenfess(menfessId, user);
  }

  @Auth(true, Role.STUDENT)
  @Delete('/:menfessId')
  removeMenfess(
    @Param('menfessId', ParseUUIDPipe) menfessId: string,
    @User() user: UserEntity,
  ) {
    return this.menfessService.removeMenfess(menfessId, user.id);
  }
}
