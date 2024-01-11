import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { UserService } from '../user/user.service';
import { MailModule } from '~/mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [ProfileService, ProfileRepository, UserService],
  controllers: [ProfileController],
})
export class ProfileModule {}
