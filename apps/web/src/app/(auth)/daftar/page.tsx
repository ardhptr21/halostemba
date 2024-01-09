import { EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link as RLink,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

          <form className="mx-auto flex w-full flex-col gap-6 px-5 md:w-3/4">
            <Box>
              <Text as="label" htmlFor="name" mb="2" className="block">
                Nama Lengkap
              </Text>
              <TextFieldRoot size="3" className="flex">
                <TextFieldInput
                  name="name"
                  id="name"
                  placeholder="Masukkan nama lengkapmu"
                />
              </TextFieldRoot>
            </Box>
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

            <Box>
              <Text as="label" htmlFor="password" mb="2" className="block">
                Kata Sandi
              </Text>
              <TextFieldRoot size="3" className="flex">
                <TextFieldInput
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Masukkan kata sandi"
                />
                <TextFieldSlot>
                  <button className="p-3">
                    <EyeOpenIcon />
                  </button>
                </TextFieldSlot>
              </TextFieldRoot>
            </Box>

            <Box>
              <Text
                as="label"
                htmlFor="confirmPassword"
                mb="2"
                className="block"
              >
                Ulangi Kata Sandi
              </Text>
              <TextFieldRoot size="3" className="flex">
                <TextFieldInput
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Konfirmasi kata sandi"
                />
                <TextFieldSlot>
                  <button className="p-3">
                    <EyeOpenIcon />
                  </button>
                </TextFieldSlot>
              </TextFieldRoot>
            </Box>

            <Button size="3" type="submit" style={{ cursor: "pointer" }}>
              Daftar
            </Button>
          </form>
        </Flex>
      </Card>
    </main>
  );
}
