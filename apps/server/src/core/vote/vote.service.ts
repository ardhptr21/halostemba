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
    });

    if (!menfess) {
      throw new NotFoundException('Menfess not found.');
    }

    if (!existingVote) {
      await this.db.vote.create({
        data: {
          type: voteDto.type,
          menfessId: voteDto.menfessId,
          userId,
        },
      });

      return {
        message: 'Vote successful.',
      };
    }

    if (existingVote.type === voteDto.type) {
      await this.db.vote.delete({ where: { id: existingVote.id } });
      return {
        message: 'Unvote successful.',
      };
    }

    await this.db.vote.update({
      where: { id: existingVote.id },
      data: { type: voteDto.type },
    });
    return {
      message: 'Vote updated.',
    };
  }
}
