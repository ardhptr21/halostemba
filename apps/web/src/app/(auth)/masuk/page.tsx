import { Card, Flex, Heading, Link as RLink, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "~/components/organisms/auth/LoginForm";
import withGuestRequired from "~/guards/auth/withGuestRequired";

export const metadata: Metadata = {
  title: "Masuk",
};

function Masuk() {
  return (
    <Card className="w-full max-w-2xl">
      <Flex width="100%" gap="8" py="5" direction="column">
        <Flex gap="2" direction="column" className="text-center">
          <Heading size="7">Masuk</Heading>
          <Text as="p" size="5">
            Belum punya akun?{" "}
            <RLink asChild>
              <Link href="/daftar">Daftar</Link>
            </RLink>
          </Text>
        </Flex>
        <LoginForm />
      </Flex>
    </Card>
  );
}

export default withGuestRequired(Masuk);
