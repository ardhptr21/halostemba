import { PropsWithChildren } from "react";
import withAuthRequired from "~/guards/auth/withAuthRequired";

function layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
export default withAuthRequired(layout, {
  emailVerified: true,
  role: ["STUDENT"],
});
