export class UserEntity {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "GUEST" | "STUDENT" | "TEACHER" | "ADMIN";
  bio: string;
  avatar: string;
  banned: boolean;
  emailVerifiedAt: Date | string;
  createdAt: Date;
  updatedAt: Date;
}
