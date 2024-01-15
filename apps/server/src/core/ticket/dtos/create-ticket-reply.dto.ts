import { IsNotEmpty, IsString } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class CreateTicketReplyDto {
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly message: string;
}
