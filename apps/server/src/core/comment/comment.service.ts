import { Prisma } from '@halostemba/db';
import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import {
  CommentNotFoundException,
  CommentServerError,
} from './comment.exception';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

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

    if (!comment) throw new CommentServerError('Gagal membuat komentar.');

    return { message: 'Komentar berhasil dibuat.', data: comment };
  }

  async removeComment(commentId: string, userId: string) {
    try {
      await this.commentRepository.removeComment(commentId, userId);

      return { message: 'Komentar telah dihapus.' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new CommentNotFoundException();
        }
      }

      throw new CommentServerError('Gagal menghapus komentar.');
    }
  }
}
