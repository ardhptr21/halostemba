export class UserEntity {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'GUEST' | 'STUDENT' | 'TEACHER' | 'ADMIN';
  avatar: string;
  banned: boolean;
  createdAt: Date;
  updatedAt: Date;
}
