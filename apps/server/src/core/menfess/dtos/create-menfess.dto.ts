import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class CreateMenfessDto {
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly content: string;

  @IsBoolean({
    message: validatorMapper('isBoolean'),
  })
  readonly anonymous: boolean;
}
