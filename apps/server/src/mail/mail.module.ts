import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MagiclinkModule } from '~/providers/magiclink/magiclink.module';
import { OtpModule } from '~/providers/otp/otp.module';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MagiclinkModule,
    OtpModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          secure: process.env.MAIL_SECURE === 'true',
          port: Number(process.env.MAIL_PORT || 465),
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: `"noreply" <${process.env.MAIL_FROM}>`,
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
