import { Module } from '@nestjs/common';
import { MenfessService } from './menfess.service';
import { MenfessController } from './menfess.controller';
import { HashtagService } from '../hashtag/hashtag.service';
import { MenfessRepository } from './menfess.repository';
import { HashtagRepository } from '../hashtag/hashtag.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [MenfessController],
  providers: [
    MenfessService,
    MenfessRepository,
    HashtagService,
    HashtagRepository,
    UserRepository,
  ],
})
export class MenfessModule {}
