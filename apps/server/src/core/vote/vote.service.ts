import { VoteType } from '@halostemba/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MenfessRepository } from '../menfess/menfess.repository';
import { NotificationEvent } from '../notification/events/notification.event';
import { UserRepository } from '../user/user.repository';
import { VoteDto } from './dtos/vote.dto';
import { VoteRepository } from './vote.repository';

@Injectable()
export class VoteService {
  constructor(
    private readonly voteRepository: VoteRepository,
    private readonly menfessRepository: MenfessRepository,
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async vote(voteDto: VoteDto, userId: string) {
    const existingVote = await this.voteRepository.existsUserVote(
      userId,
      voteDto.menfessId,
    );

    const menfess = await this.menfessRepository.getMenfessByIdWithVotes(
      voteDto.menfessId,
    );

    let score = menfess.votes.reduce(
      (acc, vote) => (vote.type === VoteType.UP ? acc + 1 : acc - 1),
      0,
    );

    if (!menfess)
      throw new NotFoundException({
        message: 'Menfess tidak ditemukan.',
        statusCode: 404,
      });

    let message = '';

    if (!existingVote) {
      await this.voteRepository.createVote({ ...voteDto, userId });

      if (voteDto.type === VoteType.UP) {
        await this.upVoteNotification(
          voteDto.menfessId,
          userId,
          menfess.authorId,
        );
      }

      score = voteDto.type === VoteType.UP ? score + 1 : score - 1;

      message = 'Berhasil vote ' + voteDto.type.toLowerCase();
    } else if (existingVote.type === voteDto.type) {
      await this.voteRepository.deleteVote(existingVote.id);
      score = voteDto.type === VoteType.UP ? score - 1 : score + 1;
      message = 'Berhasil unvote.';
    } else {
      await this.voteRepository.updateVote({
        voteId: existingVote.id,
        type: voteDto.type,
      });
      score = voteDto.type === VoteType.UP ? score + 2 : score - 2;

      if (voteDto.type === VoteType.UP) {
        await this.upVoteNotification(
          voteDto.menfessId,
          userId,
          menfess.authorId,
        );
      }

      message = 'Berhasil vote ' + voteDto.type.toLowerCase();
    }

    await this.menfessRepository.updateMenfessScore(menfess.id, score);

    return { message };
  }

  private async upVoteNotification(
    menfessId: string,
    userId: string,
    menfessUserId: string,
  ) {
    const user = await this.userRepository.findUserById(userId);

    if (userId !== menfessUserId) {
      this.eventEmitter.emit(
        'notification',
        new NotificationEvent({
          userId: menfessUserId,
          title: `${user.name} setuju dengan menfess kamu.`,
          type: 'INFO',
          message: 'Menfess kamu mendapatkan up vote.',
          url: `/menfess/${menfessId}`,
          identifier: 'VOTE',
        }),
      );
    }
  }
}
