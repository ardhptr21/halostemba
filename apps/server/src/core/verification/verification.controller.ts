import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { Role } from '@halostemba/db';
import { CreateVerificationDto } from './dtos/create-verification.dto';
import { User } from '~/commons/decorators/requests/user.decorator';
import { UserEntity } from '@halostemba/entities';
import { RejectVerificationDto } from './dtos/reject-verification.dto';
import { ListVerificationParamsDto } from './dtos/list-verification-params.dto';

@Controller('verifications')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Auth(true, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getVerifications(@Query() params: ListVerificationParamsDto) {
    return await this.verificationService.getVerifications(params);
  }

  @Auth(true, Role.GUEST)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createVerification(
    @Body() createVerificationDto: CreateVerificationDto,
    @User() user: UserEntity,
  ) {
    return await this.verificationService.createVerification(
      createVerificationDto,
      user.id,
    );
  }

  @Auth(true, Role.GUEST, Role.STUDENT)
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async getCurrentUserVerifications(@User() user: UserEntity) {
    return await this.verificationService.getCurrentUserVerifications(user.id);
  }

  @Auth(true, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Patch('/approve/:userId')
  async approveVerification(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.verificationService.approveVerificationRequest(userId);
  }

  @Auth(true, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Patch('/reject/:userId')
  async rejectVerification(
    @Body() rejectVerificationDto: RejectVerificationDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return await this.verificationService.rejectVerificationRequest(
      rejectVerificationDto,
      userId,
    );
  }
}
