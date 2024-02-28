import { Flex, Heading } from "@radix-ui/themes";
import MajorCreate from "~/components/molecules/dashboard/major/MajorCreate";
import MajorList from "~/components/molecules/dashboard/major/MajorList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

function MajorPage() {
  return (
    <>
      <Flex justify="between" align="end">
        <Heading size="8">Major List</Heading>
        <MajorCreate />
      </Flex>

      <MajorList />
    </>
  );
}

export default withAuthRequired(MajorPage, { role: ["ADMIN"] });
