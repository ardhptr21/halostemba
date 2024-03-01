import { Controller, Get, Query } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { SearchQueryHashtagDto } from './dtos/search-query-hashtag.dto';

@Controller('hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get('/search')
  async searchHashtags(@Query() searchQueryHashtagDto: SearchQueryHashtagDto) {
    return this.hashtagService.searchHashtags(searchQueryHashtagDto.q);
  }

  @Get('/popular')
  async getListPopularHashtags() {
    return this.hashtagService.getListPopularHashtags();
  }
}
