import { PropsWithChildren } from "react";
import VerificationLayout from "~/components/layouts/VerificationLayout";

interface Props extends PropsWithChildren {}

export default function layout({ children }: Props) {
  return <VerificationLayout>{children}</VerificationLayout>;
}
