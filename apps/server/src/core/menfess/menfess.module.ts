import { Module } from '@nestjs/common';
import { MenfessService } from './menfess.service';
import { MenfessController } from './menfess.controller';
import { HashtagService } from '../hashtag/hashtag.service';

@Module({
  controllers: [MenfessController],
  providers: [MenfessService, HashtagService],
})
export class MenfessModule {}
