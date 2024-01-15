import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class ListMenfessParamsDto {
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

  @IsOptional()
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly search?: string;
}
