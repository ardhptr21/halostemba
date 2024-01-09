import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { HashtagRepository } from './hashtag.repository';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService, HashtagRepository],
})
export class HashtagModule {}
