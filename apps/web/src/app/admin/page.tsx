"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { BarChart } from "@tremor/react";
import Image from "next/image";
import AdminDashboardLayout from "~/components/layouts/admin/AdminDashboardLayout";

export default function Dashboard() {
  const chartdata = [
    {
      name: "Sen",
      Tickets: 50,
    },
    {
      name: "Sel",
      Tickets: 100,
    },
    {
      name: "Rab",
      Tickets: 95,
    },
    {
      name: "Kam",
      Tickets: 200,
    },
    {
      name: "Jum",
      Tickets: 20,
    },
    {
      name: "Sab",
      Tickets: 70,
    },
    {
      name: "Min",
      Tickets: 150,
    },
  ];

  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  return (
    <AdminDashboardLayout>
      <Flex
        direction="column"
        gap="6"
        width="100%"
        className="px-16 py-9 mx-auto"
      >
        <Flex direction="row" width="100%" justify="between">
          <Heading size="8">Dashboard</Heading>
          <Button variant="outline" color="gray" size="3">
            <CalendarIcon />
            <Text>12 Jan,2023 - 18 Jan,2023</Text>
          </Button>
        </Flex>
        <Flex direction="row" gap="4" width="100%" justify="between">
          <Flex direction="column" gap="6">
            <Card>
              <Flex
                direction="row"
                align="center"
                justify="between"
                className="gap-20"
              >
                <Flex direction="column" gap="4">
                  <Text color="gray">Total User</Text>
                  <Flex direction="column">
                    <Text size="8" weight="bold">
                      500
                    </Text>
                    <Text color="gray">+10% for last week</Text>
                  </Flex>
                </Flex>
                <Box>
                  <Image
                    src="/assets/images/admin/dashboard/user.png"
                    alt="Total Requests"
                    width={50}
                    height={50}
                  />
                </Box>
              </Flex>
            </Card>
            <Card>
              <Flex
                direction="row"
                gap="9"
                align="center"
                justify="between"
                className="gap-20"
              >
                <Flex direction="column" gap="4">
                  <Text color="gray">Total Ticket</Text>
                  <Flex direction="column">
                    <Text size="8" weight="bold">
                      500
                    </Text>
                    <Text color="gray">+5% for last week</Text>
                  </Flex>
                </Flex>
                <Box>
                  <Image
                    src="/assets/images/admin/dashboard/doc.png"
                    alt="Ticket Open"
                    width={50}
                    height={50}
                  />
                </Box>
              </Flex>
            </Card>
            <Card>
              <Flex
                direction="row"
                gap="9"
                align="center"
                justify="between"
                className="gap-20"
              >
                <Flex direction="column" gap="4">
                  <Text color="gray">Total Menfess</Text>
                  <Flex direction="column">
                    <Text size="8" weight="bold">
                      6.100
                    </Text>
                    <Text color="gray">+9% for last week</Text>
                  </Flex>
                </Flex>
                <Box>
                  <Image
                    src="/assets/images/admin/dashboard/image.png"
                    alt="Ticket Closed"
                    width={50}
                    height={50}
                  />
                </Box>
              </Flex>
            </Card>
          </Flex>
          <Card style={{ width: "75%" }}>
            <Flex direction="column">
              <Heading size="6" color="gray">
                Overview of Ticket Requested
              </Heading>
              <BarChart
                data={chartdata}
                index="name"
                categories={["Tickets"]}
                valueFormatter={dataFormatter}
                onValueChange={(v) => console.log(v)}
              />
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </AdminDashboardLayout>
  );
}
