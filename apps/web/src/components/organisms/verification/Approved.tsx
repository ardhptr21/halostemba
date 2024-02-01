"use client";

import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function Approved() {
  return (
    <Flex direction="column" align="center" gap="5">
      <Image
        src="/assets/images/verification/wave.png"
        width={970}
        height={308}
        alt="Verifikasi"
        className="-z-10"
      />
      <Box className="absolute -z-10 top-28">
        <Image
          src="/assets/images/verification/rocket.png"
          width={291}
          height={298}
          alt="Aproved"
        />
      </Box>
      <Flex mt="7">
        <Flex
          direction="column"
          align="center"
          justify="start"
          className="z-10 "
          gap="2"
          mt="6"
        >
          <Heading as="h2" size="6">
            Yay, Verifikasi Sukses !
          </Heading>
          <Text size="3">
            Selamat! Kamu sudah melewati garis finish verifikasi. Sekarang
            saatnya menjelajahi segala yang menarik di halostemba.
          </Text>
        </Flex>
      </Flex>

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

      <Button asChild size="3" mt="5" className="cursor-pointer flex-grow">
        <Link href="/" className="w-full">
          Selesai
        </Link>
      </Button>
    </Flex>
  );
}
