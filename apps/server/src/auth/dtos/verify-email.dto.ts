import { IsNotEmpty, IsString, Length } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class VerifyEmailDto {
  @Length(32, 32, {
    message: validatorMapper('length'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly token: string;
}
