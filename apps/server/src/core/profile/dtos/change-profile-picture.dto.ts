import { IsNotEmpty, IsUrl } from 'class-validator';

export class ChangeProfilePictureDto {
  @IsNotEmpty()
  @IsUrl()
  readonly avatar: string;
}
