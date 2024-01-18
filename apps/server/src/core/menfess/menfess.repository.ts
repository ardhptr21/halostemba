import { Prisma } from '@halostemba/db';
import { Injectable } from '@nestjs/common';
import { paginator } from '~/providers/database/database.paginator';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateMenfessDto } from './dtos/create-menfess.dto';
import { ListMenfessParamsDto } from './dtos/list-menfess-params.dto';

const paginate = paginator({ perPage: 10 });

@Injectable()
export class MenfessRepository {
  constructor(private readonly db: DatabaseService) {}

  async listMenfess(
    params: ListMenfessParamsDto,
    hasUser: boolean,
    where?: Prisma.MenfessWhereInput,
  ) {
    return await paginate<any, Prisma.MenfessFindManyArgs>(
      this.db.menfess,
      {
        where: where || {
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
          authorId: true,
          author: { select: { name: true, username: true, avatar: true } },
          ...(hasUser && { votes: { select: { userId: true, type: true } } }),
          _count: { select: { comments: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
      {
        page: params.page,
        perPage: params.perPage,
      },
    );
  }

  async createMenfess(
    data: CreateMenfessDto & {
      userId: string;
      hashtags: string[];
    },
  ) {
    const { userId, hashtags, ...menfess } = data;
    return await this.db.menfess.create({
      data: {
        ...menfess,
        author: { connect: { id: userId } },
        hashtags: {
          connectOrCreate: hashtags.map((hashtag) => ({
            where: { name: hashtag },
            create: { name: hashtag },
          })),
        },
      },
      select: { id: true, content: true, anonymous: true },
    });
  }

  async getMenfess(menfessId: string, hasUser: boolean) {
    return await this.db.menfess.findFirst({
      where: { id: menfessId },
      select: {
        id: true,
        content: true,
        anonymous: true,
        createdAt: true,
        score: true,
        authorId: true,
        author: { select: { name: true, username: true, avatar: true } },
        ...(hasUser && { votes: { select: { userId: true, type: true } } }),
        _count: { select: { comments: true } },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: { select: { name: true, username: true, avatar: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
  async removeMenfess(menfessId: string, authorId: string) {
    return await this.db.menfess.delete({
      where: {
        id: menfessId,
        authorId,
      },
    });
  }

  async getMenfessByIdWithVotes(menfessId: string) {
    return await this.db.menfess.findFirst({
      where: { id: menfessId },
      select: {
        id: true,
        votes: { select: { type: true } },
      },
    });
  }

  async updateMenfessScore(menfessId: string, score: number) {
    return await this.db.menfess.update({
      where: { id: menfessId },
      data: { score },
    });
  }
}
