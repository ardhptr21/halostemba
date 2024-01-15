import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

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
  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly page?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly perPage?: number;

  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SortBy)
  readonly sortBy?: 'name' | 'createdAt';

  @IsOptional()
  @IsString()
  @IsEnum(Order)
  readonly order?: 'asc' | 'desc';
}
