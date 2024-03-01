import { UserEntity as UserEntityLib } from '@halostemba/entities';
import { Exclude } from 'class-transformer';

export class UserEntity extends UserEntityLib {
  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
