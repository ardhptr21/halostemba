import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';

@Injectable()
export class HashtagService {
  regex = new RegExp(/(?:^|\s)(#[^\s#]+)(?=\s|$)/gm);
  constructor(private readonly db: DatabaseService) {}

  async searchHashtags(query: string) {
    const hashtags = await this.db.hashtag.findMany({
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

    return {
      data: hashtags,
    };
  }

  async getListPopularHashtags() {
    const hashtags = await this.db.hashtag.findMany({
      where: {
        score: {
          gte: 20,
        },
      },
      orderBy: {
        score: 'desc',
      },
      take: 5,
      select: {
        name: true,
      },
    });

    return {
      data: hashtags,
    };
  }

  parseHashtags(content: string) {
    const hashtags = [...new Set(content.match(this.regex))].map((h) =>
      h.trim().replace('#', ''),
    );

    return hashtags;
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
