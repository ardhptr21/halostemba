import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class CreateVerificationDto {
  @IsUUID('all', {
    message: validatorMapper('isUUID'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly majorId: string;

  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly idCard: string;

  @Length(10, 10, {
    message: validatorMapper('length'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly nis: string;
}
