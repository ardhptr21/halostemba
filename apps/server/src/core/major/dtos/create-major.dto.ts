import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class CreateMajorDto {
  @IsString({ message: validatorMapper('isString') })
  @IsNotEmpty({ message: validatorMapper('isNotEmpty') })
  name: string;

  @IsString({ message: validatorMapper('isString') })
  @IsOptional()
  logo?: string;
}
