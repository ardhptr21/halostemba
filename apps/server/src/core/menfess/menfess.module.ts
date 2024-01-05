import { Module } from '@nestjs/common';
import { MenfessService } from './menfess.service';
import { MenfessController } from './menfess.controller';
import { HashtagService } from '../hashtag/hashtag.service';
import { MenfessRepository } from './menfess.repository';
import { HashtagRepository } from '../hashtag/hashtag.repository';

@Module({
  controllers: [MenfessController],
  providers: [
    MenfessService,
    MenfessRepository,
    HashtagService,
    HashtagRepository,
  ],
})
export class MenfessModule {}
