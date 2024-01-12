import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import withAuthRequired from "~/guards/auth/withAuthRequired";

export const metadata: Metadata = {
  title: "Verifikasi Email",
};

function VerifikasiEmail() {
  return (
    <Card className="w-full max-w-2xl">
      <Flex
        gap="6"
        align="center"
        justify="center"
        direction="column"
        p="5"
        className="text-center"
      >
        <Image
          src="/assets/images/auth/mail.png"
          alt="mail illustration"
          width={210}
          height={209}
        />
        <Heading size="7">Verifikasi Email</Heading>
        <Text as="p" size="4">
          Kami sudah mengirimkan email verifikasi ke{" "}
          <Text color="indigo" weight="bold">
            inicontoh@gmail.com
          </Text>
          . Kamu harus memverifikasi emailmu agar bisa masuk ke halostemba.
        </Text>
        <div className="text-center w-full">
          <Button
            className="max-w-md w-full"
            size="4"
            style={{ cursor: "pointer" }}
          >
            Kirim Ulang Email
          </Button>
        </div>
      </Flex>
    </Card>
  );
}

export default withAuthRequired(VerifikasiEmail, { emailVerified: false });
