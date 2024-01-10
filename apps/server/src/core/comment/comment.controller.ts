import { Role } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Auth(true, Role.ADMIN, Role.STUDENT, Role.TEACHER)
  @Post('/:menfessId')
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('menfessId', ParseUUIDPipe) menfessId: string,
    @User() user: UserEntity,
  ) {
    return this.commentService.createComment(
      createCommentDto,
      menfessId,
      user.id,
    );
  }

  @Auth(true, Role.ADMIN, Role.STUDENT, Role.TEACHER)
  @Delete('/:commentId')
  async removeComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @User() user: UserEntity,
  ) {
    return this.commentService.removeComment(commentId, user.id);
  }
}
