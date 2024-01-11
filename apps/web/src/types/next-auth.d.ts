declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    role: "GUEST" | "STUDENT" | "TEACHER" | "ADMIN";
    avatar: string;
    banned: boolean;
    createdAt: Date;
    updatedAt: Date;
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
    name: string;
    email: string;
    username: string;
    role: "GUEST" | "STUDENT" | "TEACHER" | "ADMIN";
    avatar: string;
    banned: boolean;
    createdAt: Date;
    updatedAt: Date;
    token: string;
  }
}
