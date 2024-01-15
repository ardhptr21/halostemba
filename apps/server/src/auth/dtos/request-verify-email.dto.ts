import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestVerifyEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
