import _NextAuth from "next-auth";
import { UserEntity } from "@halostemba/entities";

declare module "next-auth" {
  interface User extends UserEntity {
    token: string;
  }

  interface Session {
    user: Omit<User, "token">;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    token: string;
  }
}
