import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { MailModule } from '~/mail/mail.module';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [MailModule],
  providers: [ProfileService, ProfileRepository, UserRepository],
  controllers: [ProfileController],
})
export class ProfileModule {}
