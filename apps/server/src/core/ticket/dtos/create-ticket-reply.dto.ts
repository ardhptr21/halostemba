import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketReplyDto {
  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
