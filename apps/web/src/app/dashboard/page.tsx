import { Flex, Heading } from "@radix-ui/themes";
import DashboardOverview from "~/components/organisms/dashboard/DashboardOverview";
import { getAuthServer } from "~/lib/auth";

export default async function Dashboard() {
  const session = await getAuthServer();

  return (
    <>
      <Flex direction="row" width="100%" justify="between">
        <Heading size="8">Dashboard</Heading>
      </Flex>
      <DashboardOverview session={session!} />
    </>
  );
}
