"use client";

import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function Approved() {
  return (
    <Flex
      direction="column"
      align="center"
      gap={{ initial: "5", md: "0" }}
      className="pb-24 md:pb-0"
    >
      <Image
        src="/assets/images/verification/wave.png"
        width={970}
        height={308}
        alt="Verifikasi"
        className="-z-10 hidden sm:block"
      />
      <Image
        src="/assets/images/verification/wave-mobile.png"
        width={970}
        height={308}
        alt="Verifikasi"
        className="-z-10 sm:hidden"
      />
      <Box className="absolute -z-10 top-[6.5rem]">
        <Image
          src="/assets/images/verification/rocket.png"
          width={291}
          height={298}
          alt="Aproved"
          className="w-56 md:w-60"
        />
      </Box>
      <Flex
        direction="column"
        p="4"
        justify="center"
        gap={{ initial: "2", md: "0" }}
        width="100%"
      >
        <Flex direction="column" className="z-10 " gap="2" align="center">
          <Heading
            as="h2"
            size={{ initial: "4", md: "6" }}
            mt="4"
            align="center"
          >
            Yay, Verifikasi Sukses !
          </Heading>
          <Text size="3" className="max-w-lg" align="center">
            Selamat! Kamu sudah melewati garis finish verifikasi. Sekarang
            saatnya menjelajahi segala yang menarik di halostemba.
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" width="100%" gap="5" p="4">
        <Flex align="center" justify="center" gap="5">
          <Image
            src="/assets/images/verification/comp.png"
            width={100}
            height={100}
            alt="Education"
            className="bg-indigo-400 rounded-full"
          />
          <Flex direction="column" align="start">
            <Text weight="bold">Kemudahan menemukan solusi</Text>
            <Text>Dapatkan bantuan atas masalahmu secara anonym</Text>
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap="5">
          <Image
            src="/assets/images/verification/media.png"
            width={100}
            height={100}
            alt="Media"
            className="bg-indigo-400 rounded-full"
          />
          <Flex direction="column" align="start">
            <Text weight="bold">Akses fitur menfess</Text>
            <Text>Ekspresikan pikiran dan perasaanmu tanpa batasan</Text>
          </Flex>
        </Flex>

        <Button asChild size="3" className="cursor-pointer flex-grow">
          <Link href="/" className="w-full">
            Selesai
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
}
