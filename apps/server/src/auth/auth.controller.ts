import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { User } from '~/commons/decorators/requests/user.decorator';
import { UserEntity } from '@halostemba/entities';
import { Throttle } from '@nestjs/throttler';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { VerifyForgotPasswordDto } from './dtos/verify-forgot-password.dto';
import { ForgotPasswordResetDto } from './dtos/forgot-password-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Throttle({
    default: {
      ttl: 60000,
      limit: 1,
    },
  })
  @Auth(false)
  @HttpCode(HttpStatus.CREATED)
  @Post('request-verify-email')
  async verifyEmail(@User() user: UserEntity) {
    return await this.authService.requestVerifyEmail(user);
  }

  @Auth(false)
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  async verifyEmailToken(
    @Query() params: VerifyEmailDto,
    @User() user: UserEntity,
  ) {
    return await this.authService.verifyEmail(params.token, user);
  }

  @Throttle({
    default: {
      ttl: 60000,
      limit: 1,
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPasswordOtp(body.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password/verify')
  async verifyForgotPasswordOtp(@Body() body: VerifyForgotPasswordDto) {
    return await this.authService.verifyForgotPasswordOtp(body.otp, body.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password/reset')
  async resetPassword(@Body() body: ForgotPasswordResetDto) {
    return await this.authService.resetPasswordFromForgotPassword(
      body.token,
      body.password,
    );
  }
}
