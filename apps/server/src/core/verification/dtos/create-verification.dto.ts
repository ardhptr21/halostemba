import { IsNotEmpty, IsString, IsUUID, IsUrl, Length } from 'class-validator';

export class CreateVerificationDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  readonly majorId: string;

  @IsUrl()
  @IsNotEmpty()
  @IsString()
  readonly idCard: string;

  @Length(10)
  @IsNotEmpty()
  @IsString()
  readonly nis: string;
}
