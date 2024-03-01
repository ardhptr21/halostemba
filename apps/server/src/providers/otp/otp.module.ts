import { Module } from '@nestjs/common';
import { OtpRepository } from './otp.repository';

@Module({
  providers: [OtpRepository],
  exports: [OtpRepository],
})
export class OtpModule {}
