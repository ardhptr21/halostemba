import { Role } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ParseUserInterceptor } from '~/commons/interceptors/parse-user.interceptor';

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

  @UseInterceptors(ParseUserInterceptor)
  @Get('/:username')
  async getUserComments(
    @Param('username') username: string,
    @User() user?: UserEntity,
  ) {
    return this.commentService.getUserComments(username, user);
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
