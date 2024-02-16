import { Box, Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function TicketPage() {
  return (
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
        <Text weight="bold">Pesan akan muncul disini</Text>
        <Text size="2" className="max-w-sm text-center">
          Pilih tiket untuk memunculkan pesan. Belum punya tiket? Konsultasikan
          sekarang!
        </Text>
        <Link href="/ticket/formulir" passHref>
          <Button size="2">Formulir Konsultasi</Button>
        </Link>
      </Flex>
    </Box>
  );
}
