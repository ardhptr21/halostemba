import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly name?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: validatorMapper('isEmail'),
    },
  )
  readonly email?: string;

  @IsOptional()
  @IsString({
    message: validatorMapper('isString'),
  })
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: 'Username tidak boleh mengandung karakter spesial kecuali _ dan .',
  })
  readonly username?: string;
}
