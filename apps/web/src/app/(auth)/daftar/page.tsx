import { Card, Flex, Heading, Link as RLink, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "~/components/organisms/auth/RegisterForm";
import withGuestRequired from "~/guards/auth/withGuestRequired";

export const metadata: Metadata = { title: "Daftar" };

function Daftar() {
  return (
    <Card className="w-full max-w-2xl">
      <Flex width="100%" gap="8" py="5" direction="column">
        <Flex gap="2" direction="column" className="text-center">
          <Heading size="7">Daftar</Heading>
          <Text as="p" size="5">
            Sudah punya akun?{" "}
            <RLink asChild>
              <Link href="/masuk">Masuk</Link>
            </RLink>
          </Text>
        </Flex>
        <RegisterForm />
      </Flex>
    </Card>
  );
}

export default withGuestRequired(Daftar);
