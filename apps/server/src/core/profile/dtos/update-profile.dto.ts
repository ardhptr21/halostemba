import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: 'Username must not contain special characters or spaces',
  })
  readonly username?: string;
}
