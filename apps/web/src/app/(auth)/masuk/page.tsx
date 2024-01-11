import { Card, Flex, Heading, Link as RLink, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "~/components/organisms/auth/LoginForm";

export const metadata: Metadata = {
  title: "Masuk",
};

export default function Masuk() {
  return (
    <main
      className="flex flex-col items-center justify-center h-screen px-5 py-12 bg-center bg-cover"
      style={{
        backgroundImage: "url(/assets/images/svg/grid-pattern.svg)",
      }}
    >
      <Image
        src="/assets/images/logo.png"
        width={315}
        height={63}
        alt="Logo halostemba"
        className="mb-12"
      />
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
    </main>
  );
}
