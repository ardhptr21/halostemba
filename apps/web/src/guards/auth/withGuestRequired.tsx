import { redirect } from "next/navigation";
import { getAuthServer } from "~/lib/auth";

const withGuestRequired = <T,>(
  Component: (props: T) => JSX.Element | Promise<JSX.Element>,
) => {
  return async function WithGuestRequired(props: any) {
    const session = await getAuthServer();
    if (session) return redirect("/");
    return <Component {...props} session={session} />;
  };
};

export default withGuestRequired;
