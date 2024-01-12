import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { verifyEmailApiHandler } from "~/apis/auth/verify-email-api";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props {
  session: Session;
  searchParams: {
    token: string;
  };
}

const handleVerify = async (
  token: string,
  authtoken: string,
): Promise<{ success: boolean }> => {
  if (!token) throw notFound();

  try {
    await verifyEmailApiHandler({ token, authtoken });
    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 404) throw notFound();
    }
    return { success: false };
  }
};

async function VerifyEmail({ session, searchParams: { token } }: Props) {
  const { success } = await handleVerify(token, session.token);

  return (
    <Card className="w-full max-w-2xl">
      <Flex
        gap="6"
        align="center"
        justify="center"
        direction="column"
        p="5"
        className="text-center"
      >
        {success ? (
          <Image
            src="/assets/images/auth/verified.png"
            alt="verified illustration"
            width={152}
            height={186}
          />
        ) : (
          <Image
            src="/assets/images/auth/error.png"
            alt="error illustration"
            width={232}
            height={231}
          />
        )}
        <Heading size="7">
          {success ? "Verifikasi Berhasil!" : "Verifikasi Gagal!"}
        </Heading>
        <Text as="p" size="4" className="max-w-md">
          {success
            ? "Semuanya berjalan dengan baik, Selamat akunmu sudah terverifikasi!"
            : "Sepertinya ada sesuatu yang salah, Periksa kembali datamu atau kirim ulang email."}
        </Text>
        {success ? (
          <div className="text-center w-full">
            <Button
              asChild
              className="max-w-md w-full"
              size="4"
              style={{ cursor: "pointer" }}
            >
              <Link href="/masuk">Masuk</Link>
            </Button>
          </div>
        ) : null}
      </Flex>
    </Card>
  );
}

export default withAuthRequired(VerifyEmail, { emailVerified: false });
