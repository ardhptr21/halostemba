import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { VoteDto } from './dtos/vote.dto';
import { VoteType } from '@halostemba/db';

@Injectable()
export class VoteRepository {
  constructor(private readonly db: DatabaseService) {}

  async existsUserVote(userId: string, menfessId: string) {
    return await this.db.vote.findFirst({
      where: { userId, menfessId },
      select: { type: true, id: true },
    });
  }

  async createVote(data: VoteDto & { userId: string }) {
    return await this.db.vote.create({ data });
  }

  async updateVote(data: { voteId: number; type: VoteType }) {
    return await this.db.vote.update({
      where: { id: data.voteId },
      data: { type: data.type },
    });
  }

  async deleteVote(voteId: number) {
    return await this.db.vote.delete({ where: { id: voteId } });
  }
}
