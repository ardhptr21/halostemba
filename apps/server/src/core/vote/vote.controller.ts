import { Body, Controller, Patch } from '@nestjs/common';
import { VoteService } from './vote.service';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { VoteDto } from './dtos/vote.dto';
import { User } from '~/commons/decorators/requests/user.decorator';
import { UserEntity } from '@halostemba/entities';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Auth()
  @Patch('/')
  async vote(@Body() voteDto: VoteDto, @User() user: UserEntity) {
    return this.voteService.vote(voteDto, user.id);
  }
}
