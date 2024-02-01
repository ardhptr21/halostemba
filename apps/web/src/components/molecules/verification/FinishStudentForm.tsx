import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useCreateVerification } from "~/apis/verification/create-verification-api";
import { useVerificationStore } from "~/store/verification/verification-store";

export default function FinishStudentForm() {
  const { data: session } = useSession();
  const { decremenetStep, data } = useVerificationStore();
  const { enqueueSnackbar: toast } = useSnackbar();
  const router = useRouter();

  const { mutate: handleCreateVerification } = useCreateVerification();

  const handleClick = () => {
    handleCreateVerification(
      { ...data, token: session?.token as string },
      {
        onError: (error) => {
          const message =
            error.response?.data.error ||
            "Gagal mengirimkan verifikasi, coba lagi.";
          toast(message, { variant: "error" });
        },
        onSuccess: () => {
          const message = "Berhasil mengirimkan verifikasi.";
          toast(message, { variant: "success" });
          router.replace("/stembaclub");
        },
      },
    );
  };

  return (
    <Flex direction="column" align="center" gap="5">
      <Image
        src="/assets/images/verification/wave.png"
        width={970}
        height={308}
        alt="Verifikasi"
        className="-z-10"
      />
      <Box className="absolute top-48 -z-10">
        <Image
          src="/assets/images/verification/rocket.png"
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
            Yuk, Pastikan Semuanya Sudah Tepat!
          </Heading>
          <Text size="3" className="max-w-md text-center">
            Pastikan kalau semua datanya sudah diisi dengan benar. Kesalahan
            kecil bisa bikin kamu mengulang lagi, lho.
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
      <Flex align="center" justify="center" gap="3" width="100%">
        <Button
          variant="outline"
          className="cursor-pointer flex-grow"
          onClick={decremenetStep}
          size="3"
        >
          Kembali
        </Button>
        <Button
          size="3"
          className="cursor-pointer flex-grow"
          onClick={handleClick}
        >
          Kirim
        </Button>
      </Flex>
    </Flex>
  );
}
