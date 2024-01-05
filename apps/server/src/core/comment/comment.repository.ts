import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

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
}
