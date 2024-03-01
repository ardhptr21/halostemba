import { UserEntity } from "@halostemba/entities";
import "next-auth";

declare module "next-auth" {
  interface User extends UserEntity {
    token: string;
  }

  interface Session {
    user: UserEntity;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    token: string;
  }
}
