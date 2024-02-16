"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

interface Props {
  note: string;
}
export default function Rejected({ note }: Props) {
  return (
    <Flex
      direction="column"
      align="center"
      gap={{ initial: "2", md: "8" }}
      className="pb-24 md:pb-0"
    >
      <Image
        src="/assets/images/verification/rejected-wave.png"
        width={970}
        height={308}
        alt="Verifikasi"
        className="-z-10 hidden sm:block"
      />
      <Image
        src="/assets/images/verification/rejected-wave-mobile.png"
        width={970}
        height={308}
        alt="Verifikasi"
        className="-z-10 sm:hidden"
      />
      <Box className="absolute -z-10 top-8 md:top-10">
        <Image
          src="/assets/images/verification/rejected.png"
          width={420}
          height={344}
          alt="Rejected"
          className="w-80"
        />
      </Box>
      <Flex
        direction="column"
        width="100%"
        p={{ initial: "6", md: "0" }}
        gap={{ initial: "5", md: "7" }}
        mt={{ initial: "5", md: "0" }}
      >
        <Flex direction="column" align="center" justify="start" gap="2">
          <Heading as="h2" size={{ initial: "5", md: "6" }} align="center">
            Oops, Verifikasi Kamu Ditolak!
          </Heading>
          <Text size="3" className="max-w-lg" align="center">
            Yah, proses verifikasimu belum berhasil nih. Coba periksa lagi
            datanya, pastikan semuanya sudah benar.
          </Text>
        </Flex>

        {note && (
          <Flex align="center" justify="center" gap="5">
            <CalloutRoot color="red" size="3">
              <CalloutIcon>
                <InfoCircledIcon />
              </CalloutIcon>
              <CalloutText>{note}</CalloutText>
            </CalloutRoot>
          </Flex>
        )}

        <Button asChild size="3" color="red" className="cursor-pointer">
          <Link href="/stembaclub/verifikasi" className="w-full">
            Verifikasi Ulang
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
}
