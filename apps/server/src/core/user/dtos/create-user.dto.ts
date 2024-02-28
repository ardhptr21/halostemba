import { Role } from '@halostemba/db';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class CreateUserDTO {
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

  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsEnum(Role, {
    message: validatorMapper('isEnum'),
  })
  readonly role: Role;

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
