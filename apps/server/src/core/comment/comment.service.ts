import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Prisma } from '@halostemba/db';

@Injectable()
export class CommentService {
  constructor(private readonly db: DatabaseService) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    menfessId: string,
    userId: string,
  ) {
    const comment = await this.db.comment.create({
      data: {
        authorId: userId,
        menfessId,
        ...createCommentDto,
      },
    });

    if (!comment) {
      throw new InternalServerErrorException('Failed to create comment.');
    }

    return { message: 'Comment created.', data: comment };
  }

  async removeComment(commentId: string, userId: string) {
    try {
      await this.db.comment.delete({
        where: {
          id: commentId,
          authorId: userId,
        },
      });

      return { message: 'Comment removed.' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Comment not found.');
        }
      }

      throw new InternalServerErrorException('Failed to remove comment.');
    }
  }
}
