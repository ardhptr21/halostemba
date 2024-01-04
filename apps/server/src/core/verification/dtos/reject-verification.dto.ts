import { IsNotEmpty, IsString } from 'class-validator';

export class RejectVerificationDto {
  @IsNotEmpty()
  @IsString()
  readonly note: string;
}
