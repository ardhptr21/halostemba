import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';
import { MediaDto } from '~/core/media/dtos/media.dto';

export class CreateMenfessDto {
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly content: string;

  @IsBoolean({
    message: validatorMapper('isBoolean'),
  })
  readonly anonymous: boolean;

  @ArrayMaxSize(4, { message: validatorMapper('arrayMaxSize') })
  @ValidateNested({ each: true })
  @IsArray({ message: validatorMapper('isArray') })
  @Type(() => MediaDto)
  @IsOptional()
  readonly media: MediaDto[];
}
