import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgotPasswordResetDto {
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
