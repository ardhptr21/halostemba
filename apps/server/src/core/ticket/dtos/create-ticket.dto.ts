import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTicketDto {
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @MinLength(20)
  @IsNotEmpty()
  @IsString()
  readonly detail: string;
}
