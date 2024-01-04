import { Module } from '@nestjs/common';
import { MenfessService } from './menfess.service';
import { MenfessController } from './menfess.controller';

@Module({
  controllers: [MenfessController],
  providers: [MenfessService],
})
export class MenfessModule {}
