import { PropsWithChildren } from "react";
import VerificationLayout from "~/components/layouts/VerificationLayout";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props extends PropsWithChildren {}

function layout({ children }: Props) {
  return <VerificationLayout>{children}</VerificationLayout>;
}

export default withAuthRequired(layout, {
  role: ["GUEST"],
});
