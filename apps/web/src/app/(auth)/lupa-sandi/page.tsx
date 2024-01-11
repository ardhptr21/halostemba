import { ChevronLeftIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Lupa Kata Sandi" };

export default function LupaSandi() {
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
      <Card className="relative w-full max-w-2xl">
        <Link href="/masuk" className="absolute left-5 top-5">
          <ChevronLeftIcon width={20} height={20} />
        </Link>
        <Flex width="100%" gap="8" py="5" direction="column">
          <Flex
            gap="2"
            align="center"
            direction="column"
            className="text-center"
          >
            <Heading size="7">Lupa Kata Sandi?</Heading>
            <Text as="p" size="5" className="max-w-md px-2">
              Masukkan email kamu yang terdaftar untuk merubah kata sandi
            </Text>
          </Flex>

          <form className="mx-auto flex w-full flex-col gap-6 px-5 md:w-3/4">
            <Box>
              <Text as="label" htmlFor="email" mb="2" className="block">
                Email
              </Text>
              <TextFieldRoot size="3" className="flex">
                <TextFieldInput
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Masukkan email"
                />
              </TextFieldRoot>
            </Box>

            <Button
              asChild
              size="3"
              type="submit"
              style={{ cursor: "pointer" }}
            >
              <Link href="/lupa-sandi/verifikasi">Kirim</Link>
            </Button>
          </form>
        </Flex>
      </Card>
    </main>
  );
}
