import { redirect } from "next/navigation";
import { getVerificationDataApiHandler } from "~/apis/verification/get-veirification-data-api";
import VerifyStudentForm from "~/components/organisms/verification/VerifyStudentForm";
import { getAuthServer } from "~/lib/auth";

export const dynamic = "force-dynamic";

export default async function page() {
  const session = await getAuthServer();

  const data = await getVerificationDataApiHandler(session?.token as string);

  if (data?.status === "PENDING") return redirect("/stembaclub");

  return <VerifyStudentForm />;
}
