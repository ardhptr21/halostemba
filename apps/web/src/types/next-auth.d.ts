import _NextAuth from "next-auth";
import { UserEntity } from "@halostemba/entities";

declare module "next-auth" {
  interface User extends UserEntity {}

  interface Session {
    user: Omit<User, "token">;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Omit<UserEntity, "id"> {
    sub: string;
  }
}
