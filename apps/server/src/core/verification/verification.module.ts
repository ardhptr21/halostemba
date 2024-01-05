import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { VerificationRepository } from './verification.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService, VerificationRepository, UserRepository],
})
export class VerificationModule {}
