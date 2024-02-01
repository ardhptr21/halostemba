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
    <Flex direction="column" align="center" gap="5">
      <Image
        src="/assets/images/verification/rejected-wave.png"
        width={970}
        height={308}
        alt="Verifikasi"
        className="-z-10"
      />
      <Box className="absolute -z-10 top-14">
        <Image
          src="/assets/images/verification/rejected.png"
          width={420}
          height={344}
          alt="Rejected"
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
            Oops, Verifikasi Kamu Ditolak!
          </Heading>
          <Text size="3" className="max-w-md text-center">
            Yah, proses verifikasimu belum berhasil nih. Coba periksa lagi
            datanya, pastikan semuanya sudah benar.
          </Text>
        </Flex>
      </Flex>

      {note && (
        <Flex align="center" justify="center" gap="5">
          <CalloutRoot color="red">
            <CalloutIcon>
              <InfoCircledIcon />
            </CalloutIcon>
            <CalloutText>{note}</CalloutText>
          </CalloutRoot>
        </Flex>
      )}

      <Button asChild size="3" mt="5" color="red" className="cursor-pointer">
        <Link href="/stembaclub/verifikasi" className="w-full">
          Verifikasi Ulang
        </Link>
      </Button>
    </Flex>
  );
}
