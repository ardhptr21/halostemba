import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function TeacherTicketDashboard() {
  return (
    <Box className="relative" width="100%">
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
  );
}
