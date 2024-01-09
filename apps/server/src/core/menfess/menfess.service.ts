import { Prisma, Vote } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { endOfWeek, startOfWeek } from 'date-fns';
import { HashtagRepository } from '../hashtag/hashtag.repository';
import { HashtagService } from '../hashtag/hashtag.service';
import { CreateMenfessDto } from './dtos/create-menfess.dto';
import { ListMenfessParamsDto } from './dtos/list-menfess-params.dto';
import { MenfessRepository } from './menfess.repository';

@Injectable()
export class MenfessService {
  constructor(
    private readonly menfessRepository: MenfessRepository,
    private readonly hashtagService: HashtagService,
    private readonly hashtagRepository: HashtagRepository,
  ) {}

  async createMenfess(createMenfessDto: CreateMenfessDto, userId: string) {
    const hashtags = this.hashtagService.parseHashtags(
      createMenfessDto.content,
    );
    const menfess = await this.menfessRepository.createMenfess({
      ...createMenfessDto,
      userId,
      hashtags,
    });

    await this.hashtagRepository.modifyHashtagsScore(hashtags, 'increment');

    if (!menfess)
      throw new InternalServerErrorException('Failed to create menfess.');

    return { message: 'Menfess created.', data: menfess };
  }

  async getMenfess(menfessId: string, user: UserEntity) {
    const menfess = await this.menfessRepository.getMenfess(menfessId, !!user);

    if (!menfess) throw new NotFoundException('Menfess not found.');
    if (menfess.anonymous) menfess.author = null;

    return { data: this.serializeMenfess(menfess, user) };
  }

  async removeMenfess(menfessId: string, userId: string) {
    try {
      const deleted = await this.menfessRepository.removeMenfess(
        menfessId,
        userId,
      );

      const hashtags = this.hashtagService.parseHashtags(deleted.content);
      await this.hashtagRepository.modifyHashtagsScore(hashtags, 'decrement');

      return { message: 'Menfess removed.' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException('Menfess not found.');
      }

      throw new InternalServerErrorException('Failed to remove menfess.');
    }
  }

  async getListMenfess(user: UserEntity, params: ListMenfessParamsDto) {
    const menfesses = await this.menfessRepository.listMenfess(params, !!user);
    menfesses.data = this.serializeMenfess(menfesses.data, user);
    return menfesses;
  }

  async getListPopularMenfess(user: UserEntity, params: ListMenfessParamsDto) {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);

    const popularMenfess = await this.menfessRepository.listMenfess(
      params,
      !!user,
      {
        score: { gte: 50 },
        createdAt: { gte: start, lte: end },
      },
    );

    popularMenfess.data = this.serializeMenfess(popularMenfess.data, user);

    return popularMenfess;
  }

  private serializeMenfess(data: any | any[], user: UserEntity) {
    const serializeAuthor = (menfess: any) =>
      menfess.anonymous ? { ...menfess, author: null } : menfess;
    const serializeVotes = (menfess: any) => {
      const vote = menfess.votes.find((vote: Vote) => vote.userId === user.id);
      delete menfess.votes;
      return { ...menfess, voted: vote ? vote.type : null };
    };

    if (!Array.isArray(data)) {
      let processed = serializeAuthor(data);
      if (user) processed = serializeVotes(data);
      return processed;
    }

    let processed = data.map(serializeAuthor);
    if (user) processed = data.map(serializeVotes);
    return processed;
  }
}
