export class UserEntity {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
  banned: boolean;
  emailVerifiedAt: Date | string;
  createdAt: Date;
  updatedAt: Date;
}
