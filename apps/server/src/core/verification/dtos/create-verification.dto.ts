import { IsNotEmpty, IsString, IsUUID, IsUrl, Length } from 'class-validator';

export class CreateVerificationDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  readonly major_id: string;

  @IsUrl()
  @IsNotEmpty()
  @IsString()
  readonly id_card: string;

  @Length(10)
  @IsNotEmpty()
  @IsString()
  readonly nis: string;
}
