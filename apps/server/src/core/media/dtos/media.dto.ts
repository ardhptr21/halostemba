import { MediaType } from '@halostemba/db';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class MediaDto {
  @IsString({ message: validatorMapper('isString') })
  @IsNotEmpty({ message: validatorMapper('isNotEmpty') })
  readonly source: string;

  @IsEnum(MediaType, { message: validatorMapper('isEnum') })
  @IsNotEmpty({ message: validatorMapper('isNotEmpty') })
  readonly type: MediaType;
}
