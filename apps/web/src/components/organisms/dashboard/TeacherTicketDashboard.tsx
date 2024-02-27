import { Box, Flex, Text } from "@radix-ui/themes";
import clsx from "clsx";
import Image from "next/image";
import TicketFilter from "~/components/molecules/dashboard/ticket/TicketFilter";

export default function TeacherTicketDashboard() {
  return (
    <Flex className="w-full">
      <Box className={clsx("sm:max-w-xl w-full xl:shrink-0")}>
        <TicketFilter />
      </Box>
      <Box className="relative hidden md:block" width="100%">
        <Flex
          direction="column"
          justify="center"
          align="center"
          width="100%"
          height="100%"
          gap="4"
        >
          <Image
            src="/assets/images/ticket/empty.png"
            alt="Empty image"
            width="200"
            height="200"
          />
          <Text weight="bold">Pesan akan muncul di sini</Text>
          <Text size="2" className="max-w-sm text-center">
            Pilih tiket untuk memunculkan pesan.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
