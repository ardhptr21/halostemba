import { IsNotEmpty, IsString } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class SearchQueryHashtagDto {
  @IsString({
    message: validatorMapper('isString'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  q: string;
}
