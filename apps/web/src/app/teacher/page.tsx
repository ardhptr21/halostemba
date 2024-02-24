"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { BarChart } from "@tremor/react";
import Image from "next/image";
import TeacherDashboardLayout from "~/components/layouts/teacher/TeacherDashboardLayout";

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
    <TeacherDashboardLayout>
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
                className="gap-32"
              >
                <Flex direction="column" gap="4">
                  <Text color="gray">Total Requests</Text>
                  <Text size="8" weight="bold">
                    20
                  </Text>
                </Flex>
                <Box>
                  <Image
                    src="/assets/images/teacher/dashboard/id-card.png"
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
                className="gap-32"
              >
                <Flex direction="column" gap="4">
                  <Text color="gray">Ticket Open</Text>
                  <Text size="8" weight="bold">
                    10
                  </Text>
                </Flex>
                <Box>
                  <Image
                    src="/assets/images/teacher/dashboard/paper.png"
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
                className="gap-32"
              >
                <Flex direction="column" gap="4">
                  <Text color="gray">Ticket Closed</Text>
                  <Text size="8" weight="bold">
                    25
                  </Text>
                </Flex>
                <Box>
                  <Image
                    src="/assets/images/teacher/dashboard/box.png"
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
                Overview of Ticket Responded
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
    </TeacherDashboardLayout>
  );
}
