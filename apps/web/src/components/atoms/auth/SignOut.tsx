"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <Flex direction="row" gap="3" asChild align="center">
      <Text asChild color="gray">
        <button onClick={() => signOut()}>
          <ExitIcon width={20} height={"100%"} />
          <Text size="4">Logout</Text>
        </button>
      </Text>
    </Flex>
  );
}
