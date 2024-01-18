import { VoteType } from '@halostemba/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MenfessRepository } from '../menfess/menfess.repository';
import { VoteDto } from './dtos/vote.dto';
import { VoteRepository } from './vote.repository';

@Injectable()
export class VoteService {
  constructor(
    private readonly voteRepository: VoteRepository,
    private readonly menfessRepository: MenfessRepository,
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
      message = 'Berhasil vote ' + voteDto.type.toLowerCase();
    }

    await this.menfessRepository.updateMenfessScore(menfess.id, score);

    return { message };
  }
}
