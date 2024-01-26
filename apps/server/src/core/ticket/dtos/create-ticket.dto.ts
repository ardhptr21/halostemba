import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';
import { MediaDto } from '~/core/media/dtos/media.dto';

export class CreateTicketDto {
  @MinLength(3, { message: validatorMapper('minLength') })
  @MaxLength(100, { message: validatorMapper('maxLength') })
  @IsNotEmpty({ message: validatorMapper('isNotEmpty') })
  @IsString({ message: validatorMapper('isString') })
  readonly title: string;

  @MinLength(20)
  @IsNotEmpty({ message: validatorMapper('isNotEmpty') })
  @IsString({ message: validatorMapper('isString') })
  readonly detail: string;

  @ArrayMaxSize(1, { message: validatorMapper('arrayMaxSize') })
  @ValidateNested({ each: true })
  @IsArray({ message: validatorMapper('isArray') })
  @Type(() => MediaDto)
  @IsOptional()
  readonly media: MediaDto[];
}
