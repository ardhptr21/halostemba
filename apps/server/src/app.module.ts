import { Module } from '@nestjs/common';
import { DatabaseModule } from './providers/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
