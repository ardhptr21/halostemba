import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListMenfessParamsDto {
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
}
