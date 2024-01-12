import { User } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getAuthServer } from "~/lib/auth";

interface Options {
  role?: User["role"][];
  emailVerified?: boolean;
}

const withAuthRequired = <T,>(
  Component: (props: T) => JSX.Element | Promise<JSX.Element>,
  options: Options = {
    role: [],
    emailVerified: false,
  },
) => {
  return async function WithAuthRequired(props: any) {
    const session = await getAuthServer();
    if (!session) return redirect("/masuk");

    if (options.emailVerified) {
      if (!session.user.emailVerifiedAt) return redirect("/verifikasi-email");
    }

    if (!!options.role?.length) {
      if (!options.role.includes(session.user.role)) return notFound();
    }

    return <Component {...props} session={session} />;
  };
};

export default withAuthRequired;
