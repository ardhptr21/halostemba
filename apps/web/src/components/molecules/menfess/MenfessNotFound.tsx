import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function MenfessNotFound() {
  return (
    <Flex
      width="100%"
      height={"100%"}
      direction="column"
      gap="4"
      align={"center"}
      justify={"center"}
    >
      <Text>Menfess tidak ditemukan</Text>
      <Button asChild>
        <Link href="/explore">Cari menfess?</Link>
      </Button>
    </Flex>
  );
}
