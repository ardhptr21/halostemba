import { AuthOptions, Session, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginApiHandler } from "~/apis/auth/login-api";
import { meAuthApi } from "~/apis/auth/me-api";

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
      const { id } = user;
      return { sub: id, token: user.token };
    },
    session: async ({ token, session }) => {
      if (!token) return session;
      const { exp, token: access_token } = token;
      const user = await meAuthApi(access_token as string);

      return {
        user,
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
