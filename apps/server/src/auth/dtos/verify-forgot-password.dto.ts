import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class VerifyForgotPasswordDto {
  @Length(6, 6)
  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
