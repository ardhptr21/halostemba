import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, UserRepository],
})
export class CommentModule {}
