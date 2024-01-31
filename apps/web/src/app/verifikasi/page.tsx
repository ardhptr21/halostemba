import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import VerificationLayout from "~/components/layouts/VerificationLayout";
import VerificationFooter from "~/components/organisms/verification/VerificationFooter";

export default function page() {
  return (
    <VerificationLayout>
      <Flex direction="column" align="center" gap="5">
        <Image
          src="/assets/images/verification/wave.svg"
          width={970}
          height={308}
          alt="Verifikasi"
          className="-z-10"
        />
        <Box className="absolute top-28 -z-10">
          <Image
            src="/assets/images/verification/rocket2.svg"
            width={291}
            height={298}
            alt="Rocket"
          />
        </Box>
        <Flex mt="7">
          <Flex
            direction="column"
            align="center"
            justify="start"
            className="z-10"
            gap="2"
          >
            <Heading as="h2" size="6">
              Upgrade ke STEMBA Club, yuk!
            </Heading>
            <Text size="3">Nikmati akses lengkap ke seluruh layanannya.</Text>
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap="5">
          <Image
            src="/assets/images/verification/education.svg"
            width={101}
            height={100}
            alt="Education"
            objectFit="cover"
          />
          <Flex direction="column" align="start">
            <Text weight="bold">Kemudahan menemukan solusi</Text>
            <Text>Dapatkan bantuan atas masalahmu secara anonym</Text>
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap="5">
          <Image
            src="/assets/images/verification/medsos.svg"
            width={101}
            height={100}
            alt="Education"
          />
          <Flex direction="column" align="start">
            <Text weight="bold">Akses fitur menfess</Text>
            <Text>Ekspresikan pikiran dan perasaanmu tanpa batasan</Text>
          </Flex>
        </Flex>

        <VerificationFooter />
      </Flex>
    </VerificationLayout>
  );
}
