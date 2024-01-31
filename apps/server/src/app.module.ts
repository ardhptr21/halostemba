import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './core/comment/comment.module';
import { HashtagModule } from './core/hashtag/hashtag.module';
import { MenfessModule } from './core/menfess/menfess.module';
import { ProfileModule } from './core/profile/profile.module';
import { TicketModule } from './core/ticket/ticket.module';
import { UserModule } from './core/user/user.module';
import { VerificationModule } from './core/verification/verification.module';
import { VoteModule } from './core/vote/vote.module';
import { MailModule } from './mail/mail.module';
import { DatabaseModule } from './providers/database/database.module';
import { MagiclinkModule } from './providers/magiclink/magiclink.module';
import { OpenaiModule } from './providers/openai/openai.module';
import { OtpModule } from './providers/otp/otp.module';
import { MajorModule } from './core/major/major.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProfileModule,
    VerificationModule,
    MenfessModule,
    VoteModule,
    CommentModule,
    HashtagModule,
    TicketModule,
    MailModule,
    MagiclinkModule,
    OtpModule,
    OpenaiModule,
    MajorModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
