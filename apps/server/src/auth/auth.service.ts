import { JwtPayloadEntity } from '@halostemba/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '~/commons/entities/user.entity';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { MailService } from '~/mail/mail.service';
import { MagicLinkRepository } from '~/providers/magiclink/magiclink.repository';
import { OtpRepository } from '~/providers/otp/otp.repository';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { UserRepository } from '~/core/user/user.repository';
import { UserNotFoundException } from '~/core/user/user.exception';
import {
  InvalidTokenException,
  UserUnAuthorizedException,
} from './auth.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly magicLinkRepository: MagicLinkRepository,
    private readonly otpRepository: OtpRepository,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findUser(loginDto.username);
    if (!user) throw new UserUnAuthorizedException();

    const passwordMatch = await compare(loginDto.password, user.password);

    if (!passwordMatch) throw new UserUnAuthorizedException();

    const payload: JwtPayloadEntity = {
      username: user.username,
      sub: user.id.toString(),
    };

    return {
      user: plainToClass(UserEntity, user),
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const username =
      registerDto.name.toLowerCase().split(' ').slice(0, 2).join('_') +
      Math.floor(Math.random() * 1000);

    const hashPassword = await hash(registerDto.password, 10);
    registerDto.password = hashPassword;

    const user = await this.authRepository.registerUser({
      ...registerDto,
      username,
    });
    return new UserEntity(user);
  }

  async requestVerifyEmail(email: string) {
    const user = await this.userRepository.findUser(email);

    if (!user) throw new UserNotFoundException();

    if (user.emailVerifiedAt)
      throw new BadRequestException({
        error: 'Email telah diverifikasi.',
        statusCode: 400,
      });

    await this.mailService.sendEmailVerification(user);

    return {
      message: 'Email telah dikirim. Silahkan cek email anda.',
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const user = await this.userRepository.findUser(verifyEmailDto.email);

    if (!user) throw new UserNotFoundException();

    const magicLink = await this.magicLinkRepository.getMagicLink(
      verifyEmailDto.token,
      user.id,
    );

    if (!magicLink) throw new InvalidTokenException();

    await this.authRepository.verifyEmail(user.id);

    await this.magicLinkRepository.deleteMagicLinkByUserId(user.id);

    return {
      message: 'Email telah diverifikasi.',
    };
  }

  async forgotPasswordOtp(email: string) {
    const user = await this.userRepository.findUser(email);

    await this.mailService.sendForgotPasswordOtp(user);

    return {
      message: 'OTP telah dikirim. Silahkan cek email anda.',
    };
  }

  async verifyForgotPasswordOtp(token: string, email: string) {
    const user = await this.userRepository.findUser(email);

    const otp = await this.otpRepository.getOtp(token, user.id);

    if (!otp) throw new InvalidTokenException();

    const forgotPasswordToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        otpId: otp.id,
      },
      {
        expiresIn: '5m',
      },
    );

    return {
      message: 'OTP telah diverifikasi.',
      token: forgotPasswordToken,
    };
  }

  async resetPasswordFromForgotPassword(token: string, password: string) {
    try {
      const payload = this.jwtService.verify(token);

      const otp = await this.otpRepository.getOtpById(payload.otpId);

      if (!otp) throw new InvalidTokenException();

      const hashPassword = await hash(password, 10);
      password = hashPassword;

      await this.authRepository.resetPassword(payload.sub, password);

      await this.otpRepository.deleteOtpByUserId(payload.sub);

      return {
        message: 'Password telah diubah.',
      };
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}
