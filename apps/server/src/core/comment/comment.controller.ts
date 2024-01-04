import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { Role } from '@halostemba/db';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { User } from '~/commons/decorators/requests/user.decorator';
import { UserEntity } from '@halostemba/entities';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Auth(Role.ADMIN, Role.STUDENT, Role.TEACHER)
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

  @Auth(Role.ADMIN, Role.STUDENT, Role.TEACHER)
  @Delete('/:commentId')
  async removeComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @User() user: UserEntity,
  ) {
    return this.commentService.removeComment(commentId, user.id);
  }
}
