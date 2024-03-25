import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { VoteRepository } from './vote.repository';
import { MenfessRepository } from '../menfess/menfess.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [VoteController],
  providers: [VoteService, VoteRepository, MenfessRepository, UserRepository],
})
export class VoteModule {}
