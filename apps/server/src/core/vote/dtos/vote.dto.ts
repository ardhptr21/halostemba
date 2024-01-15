import { VoteType } from '@halostemba/db';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class VoteDto {
  @IsUUID('all', {
    message: validatorMapper('isUUID'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly menfessId: string;

  @IsEnum(VoteType, {
    message: validatorMapper('isEnum'),
  })
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsString({
    message: validatorMapper('isString'),
  })
  readonly type: VoteType;
}
