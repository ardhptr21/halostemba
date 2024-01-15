import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class ForgotPasswordResetDto {
  @MinLength(8)
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  password: string;

  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  token: string;
}
