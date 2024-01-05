import { UserEntity } from '@halostemba/entities';

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
