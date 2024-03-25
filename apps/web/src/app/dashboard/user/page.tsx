import { Flex, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import UserFilter from "~/components/molecules/dashboard/user/UserFilter";
import UserList from "~/components/molecules/dashboard/user/UserList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props {
  session: Session;
}

function UserPage({ session }: Props) {
  return (
    <>
      <Flex justify="between" align="end">
        <Heading size="8">User List</Heading>
        <UserFilter session={session} />
      </Flex>

      <UserList session={session} />
    </>
  );
}

export default withAuthRequired(UserPage, { role: ["ADMIN"] });
