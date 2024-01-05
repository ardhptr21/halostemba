import { VoteType } from '@halostemba/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { VoteDto } from './dtos/vote.dto';

@Injectable()
export class VoteService {
  constructor(private readonly db: DatabaseService) {}

  async vote(voteDto: VoteDto, userId: string) {
    const existingVote = await this.db.vote.findFirst({
      where: { userId, menfessId: voteDto.menfessId },
    });

    const menfess = await this.db.menfess.findFirst({
      where: { id: voteDto.menfessId },
      select: {
        id: true,
        votes: { select: { type: true } },
      },
    });
    let score = menfess.votes.reduce(
      (acc, vote) => (vote.type === VoteType.UP ? acc + 1 : acc - 1),
      0,
    );

    if (!menfess) {
      throw new NotFoundException('Menfess not found.');
    }

    let message = '';

    if (!existingVote) {
      await this.db.vote.create({
        data: {
          type: voteDto.type,
          menfessId: voteDto.menfessId,
          userId,
        },
      });
      score = voteDto.type === VoteType.UP ? score + 1 : score - 1;
      message = 'Vote successful.';
    } else if (existingVote.type === voteDto.type) {
      await this.db.vote.delete({ where: { id: existingVote.id } });
      score = voteDto.type === VoteType.UP ? score - 1 : score + 1;
      message = 'Unvote successful.';
    } else {
      await this.db.vote.update({
        where: { id: existingVote.id },
        data: { type: voteDto.type },
      });
      score = voteDto.type === VoteType.UP ? score + 2 : score - 2;
      message = 'Vote updated.';
    }

    await this.db.menfess.update({
      where: { id: voteDto.menfessId },
      data: { score },
    });

    return { message };
  }
}
