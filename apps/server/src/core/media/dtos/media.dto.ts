import { MediaType } from '@halostemba/db';
import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class MediaDto {
  @IsUrl({}, { message: validatorMapper('isUrl') })
  @IsString({ message: validatorMapper('isString') })
  @IsNotEmpty({ message: validatorMapper('isNotEmpty') })
  readonly source: string;

  @IsEnum(MediaType, { message: validatorMapper('isEnum') })
  @IsNotEmpty({ message: validatorMapper('isNotEmpty') })
  readonly type: MediaType;
}
