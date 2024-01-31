import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useVerificationStore } from "~/store/verification/verification-store";

export default function FinishStudentForm() {
  const { decremenetStep, data } = useVerificationStore();

  const handleClick = () => {
    alert("OKE");
    console.log(data);
  };

  return (
    <Flex direction="column" align="center" gap="5">
      <Image
        src="/assets/images/verification/wave.svg"
        width={970}
        height={308}
        alt="Verifikasi"
        className="-z-10"
      />
      <Box className="absolute top-48 -z-10">
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
            Verifikasi dalam proses, nih
          </Heading>
          <Text size="3" className="max-w-sm text-center">
            Sabar ya, tunggu verifikasi kamu berhasil buat nikmatin semua
            layanan halostemba.
          </Text>
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
      <Flex width="100%" gap="4" mt="2">
        <Button
          size="3"
          variant="outline"
          onClick={decremenetStep}
          className="w-1/2"
        >
          Kembali
        </Button>
        <Button size="3" className="w-1/2 cursor-pointer" onClick={handleClick}>
          Simpan dan Lanjut
        </Button>
      </Flex>
    </Flex>
  );
}
