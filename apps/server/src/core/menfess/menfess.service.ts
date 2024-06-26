import { Prisma } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { endOfWeek, startOfWeek } from 'date-fns';
import { OpenaiService } from '~/providers/openai/openai.service';
import { HashtagRepository } from '../hashtag/hashtag.repository';
import { HashtagService } from '../hashtag/hashtag.service';
import { CreateMenfessDto } from './dtos/create-menfess.dto';
import { ListMenfessParamsDto } from './dtos/list-menfess-params.dto';
import {
  MenfessNotFoundException,
  MenfessServerError,
} from './menfess.exception';
import { MenfessRepository } from './menfess.repository';
import { UserRepository } from '../user/user.repository';
import serializeMenfessUtil from '~/commons/utils/serializeMenfessUtil';

@Injectable()
export class MenfessService {
  constructor(
    private readonly menfessRepository: MenfessRepository,
    private readonly hashtagService: HashtagService,
    private readonly hashtagRepository: HashtagRepository,
    private readonly openaiService: OpenaiService,
    private readonly userRepository: UserRepository,
  ) {}

  async createMenfess(createMenfessDto: CreateMenfessDto, userId: string) {
    let score = 0;

    try {
      score = (
        await this.openaiService.validateMenfess(createMenfessDto.content)
      ).score;
    } catch (error) {
      score = 0;
    }

    if (score > 80)
      throw new BadRequestException({
        error: 'Menfess terdeteksi mengandung hal negatif.',
        statusCode: 400,
      });

    const hashtags = this.hashtagService.parseHashtags(
      createMenfessDto.content,
    );

    const menfess = await this.menfessRepository.createMenfess({
      ...createMenfessDto,
      userId,
      hashtags,
    });

    await this.hashtagRepository.modifyHashtagsScore(hashtags, 'increment');

    if (!menfess) throw new MenfessServerError('Gagal membuat menfess.');

    return { message: 'Menfess telah dibuat.', data: menfess };
  }

  async getMenfess(menfessId: string, user: UserEntity) {
    const menfess = await this.menfessRepository.getMenfess(menfessId, !!user);

    if (!menfess) throw new MenfessNotFoundException();
    if (menfess.anonymous) menfess.author = null;

    return { data: serializeMenfessUtil(menfess, user) };
  }

  async removeMenfess(menfessId: string, userId: string) {
    try {
      const deleted = await this.menfessRepository.removeMenfess(
        menfessId,
        userId,
      );

      const hashtags = this.hashtagService.parseHashtags(deleted.content);
      await this.hashtagRepository.modifyHashtagsScore(hashtags, 'decrement');

      return { message: 'Menfess telah dihapus.' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') throw new MenfessNotFoundException();
      }

      throw new MenfessServerError('Gagal menghapus menfess.');
    }
  }

  async getListMenfess(user: UserEntity, params: ListMenfessParamsDto) {
    const menfesses = await this.menfessRepository.listMenfess(
      params,
      !!user,
      null,
      params.order,
    );
    menfesses.data = serializeMenfessUtil(menfesses.data, user);
    return menfesses;
  }

  async getUserMenfess(userName: string, logedUser?: UserEntity) {
    const user = await this.userRepository.findUser(userName);

    const menfesses = await this.menfessRepository.listMenfess(
      {},
      !!logedUser,
      {
        authorId: user.id,
        anonymous: false,
      },
    );

    menfesses.data = serializeMenfessUtil(menfesses.data, user);

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

    popularMenfess.data = serializeMenfessUtil(popularMenfess.data, user);

    return popularMenfess;
  }
}
