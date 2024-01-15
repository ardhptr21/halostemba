import { IsNotEmpty, IsUrl } from 'class-validator';
import { validatorMapper } from '~/commons/lang/id/validator';

export class ChangeProfilePictureDto {
  @IsNotEmpty({
    message: validatorMapper('isNotEmpty'),
  })
  @IsUrl(
    {},
    {
      message: validatorMapper('isUrl'),
    },
  )
  readonly avatar: string;
}
