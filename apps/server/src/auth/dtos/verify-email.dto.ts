import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Length(32, 32)
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
