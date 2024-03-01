import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordAction from "~/components/organisms/auth/ForgotPasswordAction";
import withGuestRequired from "~/guards/auth/withGuestRequired";
export const metadata: Metadata = { title: "Lupa Kata Sandi" };

function LupaSandi() {
  return (
    <Card className="relative w-full max-w-2xl">
      <Link href="/masuk" className="absolute left-5 top-5">
        <ChevronLeftIcon width={20} height={20} />
      </Link>
      <Flex width="100%" gap="8" py="5" direction="column">
        <Flex gap="2" align="center" direction="column" className="text-center">
          <Heading size="7">Lupa Kata Sandi?</Heading>
          <Text as="p" size="5" className="max-w-md px-2">
            Masukkan email kamu yang terdaftar untuk merubah kata sandi
          </Text>
        </Flex>

        <ForgotPasswordAction />
      </Flex>
    </Card>
  );
}

export default withGuestRequired(LupaSandi);
