import { UserEntity } from '@halostemba/entities';
import {
  EmailVerification,
  ForgotPassword,
  ResetPasswordSuccess,
} from '@halostemba/transactional';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import { nanoid } from 'nanoid';
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

    const link = `${process.env.FRONTEND_URL}/verifikasi-email/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'halostemba: Link verifikasi email.',
      html: render(EmailVerification({ name: user.name, link })),
    });
  }

  async sendForgotPasswordOtp(user: UserEntity) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.otpRepository.createOtpToken(user.id, otp);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'halostemba: Lupa kata sandi.',
      html: render(ForgotPassword({ name: user.name, otp })),
    });
  }

  async sendResetPasswordSuccess(user: UserEntity) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'halostemba: Kata sandi diubah.',
      html: render(ResetPasswordSuccess({ name: user.name })),
    });
  }
}
