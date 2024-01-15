import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { UserEntity } from '@halostemba/entities';
import { MagicLinkRepository } from '~/providers/magiclink/magiclink.repository';
import { OtpRepository } from '~/providers/otp/otp.repository';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly magicLinkRepository: MagicLinkRepository,
    private readonly otpRepository: OtpRepository,
  ) {}

  async sendEmailVerification(user: UserEntity) {
    const token = nanoid(32);

    await this.magicLinkRepository.createMagicLinkToken(user.id, token);

    const url = `${process.env.FRONTEND_URL}/verifikasi-email/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'halostemba : Link verifikasi email',
      template: './email-verification',
      context: {
        name: user.name,
        url,
      },
    });
  }

  async sendForgotPasswordOtp(user: UserEntity) {
    const OtpToken = Math.floor(100000 + Math.random() * 900000);

    await this.otpRepository.createOtpToken(user.id, OtpToken.toString());

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'halostemba : Kode OTP untuk reset password',
      template: './forgot-password',
      context: {
        name: user.name,
        otp: OtpToken,
      },
    });
  }

  async sendResetPasswordSuccess(user: UserEntity) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'halostemba : password telah diubah',
      template: './reset-password-success',
      context: {
        name: user.name,
      },
    });
  }
}
