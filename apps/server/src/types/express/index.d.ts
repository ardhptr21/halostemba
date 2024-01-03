import { UserEntity } from '@halostemba/entities';

declare global {
  namespace Express {
    interface Request {
      user?: Omit<UserEntity, 'password'>;
    }
  }
}
