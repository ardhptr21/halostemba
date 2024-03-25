import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class VerifyForgotPasswordDto {
  @Length(6, 6, {
    message: validatorMapper('length'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  otp: string;

  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsEmail(
    {},
    {
      message: validatorMapper('isEmail'),
    },
  )
  email: string;
}
