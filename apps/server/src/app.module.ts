import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './core/comment/comment.module';
import { HashtagModule } from './core/hashtag/hashtag.module';
import { TicketModule } from './core/ticket/ticket.module';
import { MenfessModule } from './core/menfess/menfess.module';
import { ProfileModule } from './core/profile/profile.module';
import { UserModule } from './core/user/user.module';
import { VerificationModule } from './core/verification/verification.module';
import { VoteModule } from './core/vote/vote.module';
import { DatabaseModule } from './providers/database/database.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
