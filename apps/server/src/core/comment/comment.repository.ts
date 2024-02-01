import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { paginator } from '~/providers/database/database.paginator';
import { Prisma } from '@halostemba/db';

const paginate = paginator({ perPage: 10 });
@Injectable()
export class CommentRepository {
  constructor(private readonly db: DatabaseService) {}

  async createComment(
    data: CreateCommentDto & { menfessId: string; authorId: string },
  ) {
    const { menfessId, authorId, ...comment } = data;

    return await this.db.comment.create({
      data: {
        authorId,
        menfessId,
        ...comment,
      },
    });
  }

  async removeComment(commentId: string, userId: string) {
    return await this.db.comment.delete({
      where: {
        id: commentId,
        authorId: userId,
      },
    });
  }

  async getUserComments(userId: string, hasUser: boolean) {
    return await paginate<any, Prisma.CommentFindManyArgs>(this.db.comment, {
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: { select: { name: true, username: true, avatar: true } },
        menfess: {
          select: {
            id: true,
            content: true,
            score: true,
            anonymous: true,
            createdAt: true,
            authorId: true,
            medias: { select: { type: true, source: true } },
            author: { select: { name: true, username: true, avatar: true } },
            ...(hasUser && { votes: { select: { userId: true, type: true } } }),
            _count: { select: { comments: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
