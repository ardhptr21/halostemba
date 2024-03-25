import { Injectable } from '@nestjs/common';
import { HashtagRepository } from './hashtag.repository';

@Injectable()
export class HashtagService {
  regex = new RegExp(/(?:^|\s)(#[^\s#]+)(?=\s|$)/gm);
  constructor(private readonly hashtagRepository: HashtagRepository) {}

  async searchHashtags(query: string) {
    const hashtags = await this.hashtagRepository.searchHashtags(query);
    return { data: hashtags };
  }

  async getListPopularHashtags() {
    const hashtags = await this.hashtagRepository.listPopularHashtags(20);
    return { data: hashtags };
  }

  parseHashtags(content: string) {
    const hashtags = [...new Set(content.match(this.regex))].map((h) =>
      h.trim().replace('#', ''),
    );

    return hashtags;
  }
}
