import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
