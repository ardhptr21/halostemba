import { TicketStatus } from '@halostemba/db';
import { IsEnum, IsOptional } from 'class-validator';

export class ListTicketParamsDto {
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @IsOptional()
  search?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;
}
