import { Flex, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import RequestList from "~/components/molecules/dashboard/request/RequestList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props {
  session: Session;
}

function UserRequestPage({ session }: Props) {
  return (
    <>
      <Flex justify="between" align="end">
        <Heading size="8">Request User</Heading>
      </Flex>
      <RequestList session={session} />
    </>
  );
}

export default withAuthRequired(UserRequestPage, { role: ["ADMIN"] });
