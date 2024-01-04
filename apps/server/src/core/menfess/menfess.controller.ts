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
} from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { CreateMenfessDto } from './dtos/create-menfess.dto';
import { MenfessService } from './menfess.service';

@Controller('menfess')
export class MenfessController {
  constructor(private readonly menfessService: MenfessService) {}

  @Auth(Role.STUDENT)
  @Post('/')
  createMenfess(
    @Body() createMenfessDto: CreateMenfessDto,
    @User() user: UserEntity,
  ) {
    return this.menfessService.createMenfess(createMenfessDto, user.id);
  }

  @Get('/:menfessId')
  getMenfess(@Param('menfessId', ParseUUIDPipe) menfessId: string) {
    return this.menfessService.getMenfess(menfessId);
  }

  @Auth(Role.STUDENT)
  @Delete('/:menfessId')
  removeMenfess(
    @Param('menfessId', ParseUUIDPipe) menfessId: string,
    @User() user: UserEntity,
  ) {
    return this.menfessService.removeMenfess(menfessId, user.id);
  }
}
