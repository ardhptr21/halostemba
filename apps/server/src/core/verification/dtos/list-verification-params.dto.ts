import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class ListVerificationParamsDto {
  @IsOptional()
  @IsInt({
    message: validatorMapper('isInt'),
  })
  @Transform(({ value }) => Number(value))
  readonly page?: number;

  @IsOptional()
  @IsInt({
    message: validatorMapper('isInt'),
  })
  @Transform(({ value }) => Number(value))
  readonly perPage?: number;
}
