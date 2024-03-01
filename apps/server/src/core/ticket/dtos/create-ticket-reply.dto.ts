import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';
import { MediaDto } from '~/core/media/dtos/media.dto';

export class CreateTicketReplyDto {
  @IsNotEmpty({ message: validatorMapper('isNotEmpty') })
  @IsString({ message: validatorMapper('isString') })
  readonly message: string;

  @ValidateNested({ each: true })
  @IsArray({ message: validatorMapper('isArray') })
  @Type(() => MediaDto)
  @IsOptional()
  readonly media: MediaDto[];
}
