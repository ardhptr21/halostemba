import { IsEmail, IsNotEmpty } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class RequestVerifyEmailDto {
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
}
