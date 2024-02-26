import {
  ArchiveIcon,
  FileTextIcon,
  IdCardIcon,
  ImageIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Card, Flex, Heading } from "@radix-ui/themes";
import OverviewCard from "~/components/molecules/dashboard/OverviewCard";
import { getAuthServer } from "~/lib/auth";

export default async function Dashboard() {
  const session = await getAuthServer();
  return (
    <>
      <Flex direction="row" width="100%" justify="between">
        <Heading size="8">Dashboard</Heading>
      </Flex>
      <Flex direction="row" gap="4" width="100%" justify="between">
        <Flex direction="column" gap="6">
          {session?.user.role === "TEACHER" && (
            <>
              <OverviewCard
                color="blue"
                title="Total Requests"
                value={20}
                icon={IdCardIcon}
              />
              <OverviewCard
                color="green"
                title="Ticket Open"
                value={10}
                icon={FileTextIcon}
              />
              <OverviewCard
                color="red"
                title="Ticket Closed"
                value={10}
                icon={ArchiveIcon}
              />
            </>
          )}
          {session?.user.role === "ADMIN" && (
            <>
              <OverviewCard
                color="blue"
                title="Total User"
                value={10}
                icon={PersonIcon}
              />
              <OverviewCard
                color="yellow"
                title="Total Ticket"
                value={10}
                icon={FileTextIcon}
              />
              <OverviewCard
                color="plum"
                title="Total Menfess"
                value={10}
                icon={ImageIcon}
              />
            </>
          )}
        </Flex>
        <Card style={{ width: "75%" }}>
          <Flex direction="column">
            <Heading size="6" color="gray">
              Overview of Ticket Responded
            </Heading>
            {/* <BarChart
              data={chartdata}
              index="name"
              categories={["Tickets"]}
              valueFormatter={dataFormatter}
              onValueChange={(v) => console.log(v)}
            /> */}
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
