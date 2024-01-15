"use client";

import { Card, Flex } from "@radix-ui/themes";
import VerificationEmailForm from "~/components/organisms/auth/VerificationEmailForm";

export default function VerifikasiEmail() {
  return (
    <Card className="relative w-full max-w-2xl">
      <Flex width="100%" gap="5" p="5" direction="column">
        <VerificationEmailForm />
      </Flex>
    </Card>
  );
}
