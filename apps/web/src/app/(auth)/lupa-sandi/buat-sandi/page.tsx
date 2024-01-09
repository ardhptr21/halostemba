import { ChevronLeftIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Lupa Kata Sandi" };

export default function BuatSandi() {
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
        <Link href="/lupa-sandi/verifikasi" className="absolute left-5 top-5">
          <ChevronLeftIcon width={20} height={20} />
        </Link>
        <Flex width="100%" gap="8" py="5" direction="column">
          <Flex
            gap="2"
            align="center"
            direction="column"
            className="text-center"
          >
            <Heading size="7">Buat Kata Sandi</Heading>
            <Text as="p" size="5" className="max-w-md px-1">
              Masukkan kata sandi baru. Buat kata sandi yang mudah untuk diingat
              ya!
            </Text>
          </Flex>

          <form className="mx-auto flex w-full flex-col gap-6 px-5 md:w-3/4">
            <Box>
              <Text as="label" htmlFor="password" mb="2" className="block">
                Kata Sandi Baru
              </Text>
              <TextFieldRoot size="3" className="flex">
                <TextFieldInput
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Masukkan kata sandi"
                />
                <TextFieldSlot>
                  <button className="p-3" type="button">
                    <EyeOpenIcon />
                  </button>
                </TextFieldSlot>
              </TextFieldRoot>
            </Box>

            <Box>
              <Text as="label" htmlFor="password" mb="2" className="block">
                Ulangi Kata Sandi
              </Text>
              <TextFieldRoot size="3" className="flex">
                <TextFieldInput
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder="Konfirmasi kata sandi"
                />
                <TextFieldSlot>
                  <button className="p-3" type="button">
                    <EyeOpenIcon />
                  </button>
                </TextFieldSlot>
              </TextFieldRoot>
            </Box>

            <Button size="3" type="submit" style={{ cursor: "pointer" }}>
              Ubah Kata Sandi
            </Button>
          </form>
        </Flex>
      </Card>
    </main>
  );
}
