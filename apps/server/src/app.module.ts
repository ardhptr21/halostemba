import { Module } from '@nestjs/common';
import { DatabaseModule } from './providers/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './core/user/user.module';
import { ProfileModule } from './core/profile/profile.module';
import { VerificationService } from './core/verification/verification.service';
import { VerificationModule } from './core/verification/verification.module';
import { MenfessModule } from './core/menfess/menfess.module';
import { VoteModule } from './core/vote/vote.module';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ProfileModule,
    VerificationModule,
    MenfessModule,
    VoteModule,
  ],
  controllers: [],
  providers: [VerificationService],
})
export class AppModule {}
