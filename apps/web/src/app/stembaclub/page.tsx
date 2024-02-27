import { Flex } from "@radix-ui/themes";
import { Session } from "next-auth";
import { getVerificationDataApiHandler } from "~/apis/verification/get-veirification-data-api";
import Approved from "~/components/organisms/verification/Approved";
import Initial from "~/components/organisms/verification/Initial";
import Pending from "~/components/organisms/verification/Pending";
import Rejected from "~/components/organisms/verification/Rejected";
import withAuthRequired from "~/guards/auth/withAuthRequired";

export const dynamic = "force-dynamic";

interface Props {
  session: Session;
}

async function VerificationPage({ session }: Props) {
  const data = await getVerificationDataApiHandler(session.token);

  return (
    <Flex direction="column" align="center" gap="5">
      {data ? (
        <>
          {data.status === "APPROVED" && <Approved />}
          {data.status === "PENDING" && <Pending />}
          {data.status === "REJECTED" && <Rejected note={data.note} />}
        </>
      ) : (
        <Initial />
      )}
    </Flex>
  );
}

export default withAuthRequired(VerificationPage, {
  role: ["GUEST", "STUDENT"],
});
