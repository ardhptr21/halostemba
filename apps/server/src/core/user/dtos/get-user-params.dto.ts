import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

enum SortBy {
  name = 'name',
  createdAt = 'createdAt',
}

enum Order {
  asc = 'asc',
  desc = 'desc',
}
export class GetUserParamsDto {
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

  @IsOptional()
  @IsString({
    message: validatorMapper('isString'),
  })
  @IsEnum(SortBy, {
    message: validatorMapper('isEnum'),
  })
  readonly sortBy?: 'name' | 'createdAt';

  @IsOptional()
  @IsString({
    message: validatorMapper('isString'),
  })
  @IsEnum(Order, {
    message: validatorMapper('isEnum'),
  })
  readonly order?: 'asc' | 'desc';
}
