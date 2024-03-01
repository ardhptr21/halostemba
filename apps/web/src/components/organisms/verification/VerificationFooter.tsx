"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  verificationStatus: "PENDING" | "REJECTED" | "APPROVED" | null;
}

export default function VerificationFooter({ verificationStatus }: Props) {
  const router = useRouter();
  const nextButtonText: {
    [key: string]: string;
  } = {
    REJECTED: "Verifikasi Ulang",
    APPROVED: "Selesai",
  };

  return (
    <Flex
      direction="column"
      align="start"
      className="border-t border-t-slate-600 pb-5"
      width="100%"
      gap="3"
      pt="2"
      mt="3"
    >
      <Text size="2">
        Dengan memverifikasi data, kamu dinyatakan menyetujui{" "}
        <span className="text-[#9db1ff]">Ketentuan Layanan</span> dan{" "}
        <span className="text-[#9db1ff]">Kebijakan Privasi</span> halostemba.
      </Text>
      <Flex align="end" justify="end" gap="3" width="100%">
        {verificationStatus !== "APPROVED" && (
          <Button
            color="red"
            className="w-1/2 py-5 cursor-pointer"
            onClick={() => router.back()}
          >
            Batal
          </Button>
        )}
        <Button
          color="indigo"
          className={
            verificationStatus === "APPROVED"
              ? "w-full py-5 cursor-pointer"
              : "w-1/2 py-5 cursor-pointer"
          }
          onClick={() => router.push("/stembaclub/formulir")}
        >
          {!verificationStatus && "Upgrade Sekarang"}
          {verificationStatus && nextButtonText[verificationStatus]}
        </Button>
      </Flex>
    </Flex>
  );
}
