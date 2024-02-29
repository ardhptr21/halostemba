import { Flex, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import MajorCreate from "~/components/molecules/dashboard/major/MajorCreate";
import MajorList from "~/components/molecules/dashboard/major/MajorList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props {
  session: Session;
}

function MajorPage({ session }: Props) {
  return (
    <>
      <Flex justify="between" align="end">
        <Heading size="8">Major List</Heading>
        <MajorCreate session={session} />
      </Flex>

      <MajorList session={session} />
    </>
  );
}

export default withAuthRequired(MajorPage, { role: ["ADMIN"] });
