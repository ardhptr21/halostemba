import { Prisma } from '@halostemba/db';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly db: DatabaseService,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    menfessId: string,
    authorId: string,
  ) {
    const comment = await this.commentRepository.createComment({
      ...createCommentDto,
      menfessId,
      authorId,
    });

    if (!comment)
      throw new InternalServerErrorException('Failed to create comment.');

    return { message: 'Comment created.', data: comment };
  }

  async removeComment(commentId: string, userId: string) {
    try {
      await this.commentRepository.removeComment(commentId, userId);

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
