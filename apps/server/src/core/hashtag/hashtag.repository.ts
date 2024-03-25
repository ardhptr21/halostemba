import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';

@Injectable()
export class HashtagRepository {
  constructor(private readonly db: DatabaseService) {}

  async searchHashtags(query: string) {
    return await this.db.hashtag.findMany({
      where: {
        name: {
          startsWith: query,
        },
      },
      orderBy: {
        score: 'desc',
      },
      select: {
        name: true,
      },
      take: 5,
    });
  }

  async listPopularHashtags(treshold: number = 20) {
    return await this.db.hashtag.findMany({
      where: {
        score: {
          gte: treshold,
        },
      },
      orderBy: {
        score: 'desc',
      },
      take: 5,
      select: {
        name: true,
        score: true,
      },
    });
  }

  async modifyHashtagsScore(
    hashtags: string[],
    type: 'increment' | 'decrement',
  ) {
    await this.db.hashtag.updateMany({
      where: {
        name: {
          in: hashtags,
        },
      },
      data: {
        score: {
          [type]: 1,
        },
      },
    });
  }
}
