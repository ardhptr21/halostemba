import { VoteType } from '@halostemba/db';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class VoteDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  readonly menfessId: string;

  @IsEnum(VoteType)
  @IsNotEmpty()
  @IsString()
  readonly type: VoteType;
}
