"use client";

import { Box, Button, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Initial() {
  const router = useRouter();
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
            mt={{ initial: "8", md: "4" }}
            align="center"
          >
            Upgrade ke STEMBA Club, yuk!
          </Heading>
          <Text size="3">Nikmati akses lengkap ke seluruh layanannya.</Text>
        </Flex>
        <Flex direction="column" gap="5" p="4">
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
        </Flex>

        <Separator
          orientation="horizontal"
          size="2"
          style={{ width: "100%" }}
          my="1"
        />

        <Flex direction="column" gap="3">
          <Flex direction="row" p="1">
            <Text size="2">
              Dengan memverifikasi data, kamu dinyatakan menyetujui{" "}
              <Text as="span" color="indigo">
                Ketentuan Layanan
              </Text>{" "}
              dan{" "}
              <Text as="span" color="indigo">
                Kebijakan Privasi
              </Text>{" "}
              halostemba.
            </Text>
          </Flex>
          <Flex
            direction={{ initial: "column", md: "row-reverse" }}
            gap="3"
            width="100%"
          >
            <Button asChild size="3" className="cursor-pointer md:w-1/2">
              <Link href="/stembaclub/verifikasi">Verifikasi Sekarang</Link>
            </Button>
            <Button
              color="red"
              className="cursor-pointer flex-grow"
              onClick={() => router.back()}
              size="3"
            >
              Batal
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
