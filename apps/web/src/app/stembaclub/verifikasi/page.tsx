import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getVerificationDataApiHandler } from "~/apis/verification/get-veirification-data-api";
import VerifyStudentForm from "~/components/organisms/verification/VerifyStudentForm";
import withAuthRequired from "~/guards/auth/withAuthRequired";

export const dynamic = "force-dynamic";
interface Props {
  session: Session;
}

async function page({ session }: Props) {
  const data = await getVerificationDataApiHandler(session.token);

  if (data?.status === "PENDING") return redirect("/stembaclub");

  return <VerifyStudentForm />;
}

export default withAuthRequired(page, { role: ["GUEST"], emailVerified: true });
