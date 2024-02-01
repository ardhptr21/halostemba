import { Flex } from "@radix-ui/themes";
import { getVerificationDataApiHandler } from "~/apis/verification/get-veirification-data-api";
import Approved from "~/components/organisms/verification/Approved";
import Initial from "~/components/organisms/verification/Initial";
import Pending from "~/components/organisms/verification/Pending";
import Rejected from "~/components/organisms/verification/Rejected";
import { getAuthServer } from "~/lib/auth";

export const dynamic = "force-dynamic";

export default async function VerificationPage() {
  const session = await getAuthServer();

  const data = await getVerificationDataApiHandler(session?.token as string);

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
