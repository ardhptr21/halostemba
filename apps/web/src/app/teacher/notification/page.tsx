import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import TeacherDashboardLayout from "~/components/layouts/teacher/TeacherDashboardLayout";

export default function DashboardNotification() {
  return (
    <TeacherDashboardLayout>
      <Flex
        direction="column"
        gap="6"
        width="100%"
        className="px-16 py-9 mx-auto"
      >
        <Heading size="8">Notification</Heading>

        <Card>
          <Flex direction="row" align="center" gap="3">
            <Image
              src="/assets/images/teacher/notification/ticket.png"
              alt="Ticket"
              width={40}
              height={40}
            />
            <Flex direction="column" width="100%">
              <Flex direction="row" justify="between">
                <Text>New Ticket</Text>
                <Text size="2" color="gray">
                  10.00{" "}
                </Text>
              </Flex>
              <Text color="gray">
                Ada ticket baru yang masuk, cek ticket yuk!
              </Text>
            </Flex>
          </Flex>
        </Card>

        <Flex
          direction="column"
          py="6"
          gap="4"
          className="border-t border-[#FFFFFF2C]"
        >
          <Flex direction="row" align="center" gap="3" pl="3">
            <Image
              src="/assets/images/teacher/notification/ticket.png"
              alt="Ticket"
              width={40}
              height={40}
            />
            <Flex direction="column">
              <Text>New Ticket</Text>
              <Text color="gray">
                Ada ticket baru yang masuk, cek ticket yuk!
              </Text>
            </Flex>
          </Flex>
          <Card ml="9">
            <Flex direction="row" gap="5" align="center">
              <Box>
                <Image
                  src="/assets/images/teacher/notification/poster.png"
                  alt="Ticket"
                  width={100}
                  height={100}
                />
              </Box>

              <Flex direction="column" gap="2">
                <Text>Pendaftaran KIP-K </Text>
                <Text color="gray">
                  Izin bertanya pak/bu terkait KIP Kuliah ini. Apakah peserta
                  yang ingin mendaftar sebagai...{" "}
                  <Text as="span" color="indigo">
                    Show more
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </TeacherDashboardLayout>
  );
}
