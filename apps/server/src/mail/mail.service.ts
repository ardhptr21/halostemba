import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { UserEntity } from '@halostemba/entities';
import { MagicLinkRepository } from '~/providers/magiclink/magiclink.repository';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly magicLinkRepository: MagicLinkRepository,
  ) {}

  async sendEmailVerification(user: UserEntity) {
    const token = nanoid(32);

    await this.magicLinkRepository.createMagicLinkToken(user.id, token);

    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

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
}
