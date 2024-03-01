"use client";
import {
  ArchiveIcon,
  FileTextIcon,
  IdCardIcon,
  ImageIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { BarChart } from "@tremor/react";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { Session } from "next-auth";
import { useGetStatistics } from "~/apis/dashboard/get-statistics-api";
import OverviewCard from "~/components/molecules/dashboard/OverviewCard";
import DashboardOverviewSkeleton from "~/components/molecules/dashboard/skeletons/DashboardOverviewSkeleton";

interface DashboardOverviewProps {
  session: Session;
}

export default function DashboardOverview({ session }: DashboardOverviewProps) {
  const { data, isFetching } = useGetStatistics(session.token);

  if (isFetching) return <DashboardOverviewSkeleton />;

  return (
    <Flex direction="row" width="100%" gap="5" justify="between">
      <Flex direction="column" className="max-w-xs w-full" gap="6">
        {session?.user.role === "TEACHER" && (
          <>
            <OverviewCard
              color="blue"
              title="Total Requests"
              value={data?.ticket_count.waiting || 0}
              icon={IdCardIcon}
            />
            <OverviewCard
              color="green"
              title="Ticket Open"
              value={data?.ticket_count.open || 0}
              icon={FileTextIcon}
            />
            <OverviewCard
              color="red"
              title="Ticket Closed"
              value={data?.ticket_count.closed || 0}
              icon={ArchiveIcon}
            />
          </>
        )}
        {session?.user.role === "ADMIN" && (
          <>
            <OverviewCard
              color="blue"
              title="Total User"
              value={data?.total_users || 0}
              icon={PersonIcon}
            />
            <OverviewCard
              color="yellow"
              title="Total Ticket"
              value={data?.total_tickets || 0}
              icon={FileTextIcon}
            />
            <OverviewCard
              color="plum"
              title="Total Menfess"
              value={data?.total_menfess || 0}
              icon={ImageIcon}
            />
          </>
        )}
      </Flex>
      <Card className="p-5 w-full">
        <Flex direction="column">
          <Heading size="6" color="gray">
            Overview Ticket Responded
          </Heading>
          <BarChart
            className="mt-5 rounded"
            data={data!.ticket_statistics.map((i) => ({
              ticket: i.count,
              date: format(new Date(i.date), "dd MMMM yyyy", { locale: id }),
            }))}
            index="date"
            categories={["ticket"]}
            colors={["red"]}
            autoMinValue
            showLegend={false}
            noDataText="Tidak ada Data"
          />
        </Flex>
      </Card>
    </Flex>
  );
}
