import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @Length(32, 32)
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
