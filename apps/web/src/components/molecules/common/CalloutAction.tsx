import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function CalloutAction() {
  return (
    <Card className="w-full">
      <Flex direction="row" align="center" gap="4">
        <Image
          src={"/assets/images/cta.png"}
          width={350}
          height={350}
          alt="cta"
        />
        <Flex direction="column" gap="2" p="4">
          <Heading size="5">
            Temukan Solusi Bersama {"'"}halostemba{"'"}
          </Heading>
          <Text size="3" color="gray">
            Halostemba siap membantu siswa menemukan solusi terbaik. Segera
            konsultasikan masalah Anda untuk langkah awal menuju solusi yang
            tepat.
          </Text>
          <Button size="3" className="mt-5">
            Konsul
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
