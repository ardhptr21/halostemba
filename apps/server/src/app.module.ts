import { Module } from '@nestjs/common';
import { DatabaseModule } from './providers/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './core/user/user.module';
import { ProfileModule } from './core/profile/profile.module';
@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
