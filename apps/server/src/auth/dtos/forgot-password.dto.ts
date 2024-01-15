import { IsEmail, IsNotEmpty } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class ForgotPasswordDto {
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsEmail(null, {
    message: validatorMapper('isEmail'),
  })
  email: string;
}
