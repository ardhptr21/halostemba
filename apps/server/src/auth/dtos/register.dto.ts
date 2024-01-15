import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class RegisterDto {
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly name: string;

  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsEmail(
    {},
    {
      message: validatorMapper('isEmail'),
    },
  )
  readonly email: string;

  @MinLength(8, {
    message: validatorMapper('minLength'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  password: string;
}
