import { TicketStatus } from '@halostemba/db';
import { IsEnum, IsOptional } from 'class-validator';

export class ListTicketParamsDto {
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;
}
