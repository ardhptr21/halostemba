import { Card, Flex, Heading, Link as RLink, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "~/components/organisms/auth/RegisterForm";

export const metadata: Metadata = { title: "Daftar" };

export default function Daftar() {
  return (
    <main
      className="flex h-screen flex-col items-center justify-center bg-cover bg-center px-5 py-12"
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
    </main>
  );
}
