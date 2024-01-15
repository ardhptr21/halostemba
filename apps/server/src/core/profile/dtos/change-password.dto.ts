import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class ChangePasswordDto {
  @MinLength(8, {
    message: validatorMapper('minLength'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly password: string;
}
