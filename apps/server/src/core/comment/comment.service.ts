import { Prisma } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import serializeMenfessUtil from '~/commons/utils/serializeMenfessUtil';
import { NotificationEvent } from '../notification/events/notification.event';
import { UserRepository } from '../user/user.repository';
import {
  CommentNotFoundException,
  CommentServerError,
} from './comment.exception';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    menfessId: string,
    commentAuthorId: string,
  ) {
    const comment = await this.commentRepository.createComment({
      ...createCommentDto,
      menfessId,
      authorId: commentAuthorId,
    });

    if (!comment) throw new CommentServerError('Gagal membuat komentar.');

    this.commentNotification(
      menfessId,
      comment.menfess.authorId,
      commentAuthorId,
      comment.author.name,
      {
        message: comment.content,
        media: comment.menfess.medias[0]?.source,
      },
    );

    return { message: 'Komentar berhasil dibuat.', data: comment };
  }

  async getUserComments(username: string, logedUser?: UserEntity) {
    const user = await this.userRepository.findUser(username);

    const comments = await this.commentRepository.getUserComments(
      user.id,
      true,
    );

    comments.data = comments.data.map((comment: any) => ({
      menfess: serializeMenfessUtil(comment.menfess, logedUser),
      comment: {
        ...comment,
        menfess: undefined,
      },
    }));

    return comments;
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

  private commentNotification(
    menfessId: string,
    userId: string,
    authorId: string,
    authorName: string,
    content: {
      message: string;
      media?: string;
    },
  ) {
    if (userId === authorId) return;
    this.eventEmitter.emit(
      'notification',
      new NotificationEvent({
        userId,
        title: `${authorName} mengomentari menfess kamu.`,
        type: 'INFO',
        message: content.message,
        url: `/menfess/${menfessId}`,
        image: content.media,
        identifier: 'COMMENT',
      }),
    );
  }
}
