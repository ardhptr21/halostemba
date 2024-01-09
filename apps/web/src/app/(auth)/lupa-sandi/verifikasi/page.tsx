import { ChevronLeftIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextFieldInput,
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
        <Link href="/lupa-sandi" className="absolute left-5 top-5">
          <ChevronLeftIcon width={20} height={20} />
        </Link>
        <Flex width="100%" gap="8" py="5" direction="column">
          <Flex gap="2" direction="column" className="text-center">
            <Heading size="7">Kode Verifikasi</Heading>
            <Text as="p" size="5" className="px-36">
              Email sudah terkirim. Buka email kamu untuk mendapatkan kode
              verifikasi
            </Text>
          </Flex>

          <form className="mx-auto flex w-full flex-col gap-6 px-5 md:w-3/4">
            <Box>
              <Flex justify="between">
                <Text as="label" htmlFor="email" mb="2" className="block">
                  Masukkan Kode Verifikasi
                </Text>

                <Text className="block">01.00</Text>
              </Flex>
              <Flex direction="row" gap="2">
                <TextFieldInput
                  size="3"
                  name="otp"
                  id="otp"
                  className="text-center"
                />
                <TextFieldInput
                  size="3"
                  name="otp"
                  id="otp"
                  className="text-center"
                />
                <TextFieldInput
                  size="3"
                  name="otp"
                  id="otp"
                  className="text-center"
                />
                <TextFieldInput
                  size="3"
                  name="otp"
                  id="otp"
                  className="text-center"
                />
              </Flex>
            </Box>

            <Button
              asChild
              size="3"
              type="submit"
              style={{ cursor: "pointer" }}
            >
              <Link href="/lupa-sandi/buat-sandi">Ubah Kata Sandi</Link>
            </Button>
            <Button
              variant="outline"
              size="3"
              type="submit"
              style={{ cursor: "pointer" }}
            >
              Kirim Ulang
            </Button>
          </form>
        </Flex>
      </Card>
    </main>
  );
}
