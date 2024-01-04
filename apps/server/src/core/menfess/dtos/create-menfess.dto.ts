import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMenfessDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly anonymous: boolean;
}
