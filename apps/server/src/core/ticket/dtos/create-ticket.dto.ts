import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class CreateTicketDto {
  @MinLength(3, {
    message: validatorMapper('minLength'),
  })
  @MaxLength(100, {
    message: validatorMapper('maxLength'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly title: string;

  @MinLength(20)
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly detail: string;
}
