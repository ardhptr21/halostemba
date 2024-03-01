import { IsNotEmpty, IsString } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class CreateCommentDto {
  @IsString({
    message: validatorMapper('isString'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  content: string;
}
