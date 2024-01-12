import { AuthOptions, Session, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginApiHandler } from "~/apis/auth/login-api";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username or email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(creds) {
        if (!creds) return null;

        const { username, password } = creds;

        if (!username || !password) return null;

        try {
          const data = await loginApiHandler(creds);
          return {
            ...data.user,
            token: data.access_token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user) return token;
      const { id, ...properties } = user;
      return { sub: id, ...properties };
    },
    session: ({ token, session }) => {
      if (!token) return session;

      const { sub, exp, token: access_token, ...properties } = token;

      return {
        user: {
          id: sub,
          ...properties,
        },
        token: access_token as string,
        expires: exp as string,
      } satisfies Session;
    },
  },
  pages: {
    signIn: "/masuk",
  },
};

export const getAuthServer = () => getServerSession(authOptions);
