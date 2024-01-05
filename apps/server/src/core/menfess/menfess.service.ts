import { Prisma, Vote } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { endOfWeek, startOfWeek } from 'date-fns';
import { paginator } from '~/providers/database/database.paginator';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateMenfessDto } from './dtos/create-menfess.dto';
import { ListMenfessParamsDto } from './dtos/list-menfess-params.dto';

const paginate = paginator({ perPage: 10 });

@Injectable()
export class MenfessService {
  constructor(private readonly db: DatabaseService) {}

  async createMenfess(createMenfessDto: CreateMenfessDto, userId: string) {
    const menfess = await this.db.menfess.create({
      data: {
        ...createMenfessDto,
        author: { connect: { id: userId } },
        hashtags: {
          connectOrCreate: this.parseHashtags(createMenfessDto.content),
        },
      },
      select: { id: true, content: true, anonymous: true },
    });

    if (!menfess) {
      throw new InternalServerErrorException('Failed to create menfess.');
    }

    return { message: 'Menfess created.', data: menfess };
  }

  async getMenfess(menfessId: string) {
    const menfess = await this.db.menfess.findFirst({
      where: { id: menfessId },
      select: {
        id: true,
        content: true,
        anonymous: true,
        createdAt: true,
        author: { select: { name: true, username: true } },
        votes: { select: { userId: true, type: true } },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!menfess) {
      throw new NotFoundException('Menfess not found.');
    }

    if (menfess.anonymous) {
      menfess.author = null;
    }

    return { data: menfess };
  }

  async removeMenfess(menfessId: string, userId: string) {
    try {
      await this.db.menfess.delete({
        where: {
          id: menfessId,
          authorId: userId,
        },
      });

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
    const paginated = await paginate<any, Prisma.MenfessFindManyArgs>(
      this.db.menfess,
      {
        where: {
          content: {
            contains: params.search || undefined,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          content: true,
          score: true,
          anonymous: true,
          createdAt: true,
          author: { select: { name: true, username: true, avatar: true } },
          ...(user && { votes: { select: { userId: true, type: true } } }),
        },
        orderBy: { createdAt: 'desc' },
      },
      {
        page: params.page,
        perPage: params.perPage,
      },
    );

    paginated.data = paginated.data.map((menfess) =>
      menfess.anonymous ? { ...menfess, author: null } : menfess,
    );

    if (user) {
      paginated.data = paginated.data.map((menfess) => {
        const vote = menfess.votes.find(
          (vote: Vote) => vote.userId === user.id,
        );
        delete menfess.votes;
        return { ...menfess, voted: vote ? vote.type : null };
      });
    }

    return { paginated };
  }

  async getListPopularMenfess(user: UserEntity, params: ListMenfessParamsDto) {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);

    const popularMenfess = await paginate<any, Prisma.MenfessFindManyArgs>(
      this.db.menfess,
      {
        where: {
          score: {
            gte: 50,
          },
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        select: {
          id: true,
          content: true,
          score: true,
          anonymous: true,
          createdAt: true,
          author: { select: { name: true, username: true, avatar: true } },
          ...(user && { votes: { select: { userId: true, type: true } } }),
        },
        orderBy: { createdAt: 'desc' },
      },
      {
        page: params.page,
        perPage: params.perPage,
      },
    );

    popularMenfess.data = popularMenfess.data.map((menfess) =>
      menfess.anonymous ? { ...menfess, author: null } : menfess,
    );

    if (user) {
      popularMenfess.data = popularMenfess.data.map((menfess) => {
        const vote = menfess.votes.find(
          (vote: Vote) => vote.userId === user.id,
        );
        delete menfess.votes;
        return { ...menfess, voted: vote ? vote.type : null };
      });
    }

    return popularMenfess;
  }

  private parseHashtags(content: string) {
    const regex = new RegExp(/(?:^|\s)(#[^\s#]+)(?=\s|$)/gm);
    const hashtags = [...new Set(content.match(regex))].map((h) => {
      const tag = h.trim().replace('#', '');
      return { where: { name: tag }, create: { name: tag } };
    });

    return hashtags;
  }
}
