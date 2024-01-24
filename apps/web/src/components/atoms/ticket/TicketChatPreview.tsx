import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function TicketChatPreview() {
  return (
    <Box
      width={"100%"}
      px={"3"}
      pt={"2"}
      asChild
      className="hover:bg-[#3E63DD]/25 group"
    >
      <Link href={"/ticket/1"} className="inline-block">
        <Box
          className="border-b border-b-gray-500/70 group-hover:border-b-transparent"
          pb={"3"}
        >
          <Flex justify={"between"} width={"100%"} gap={"3"}>
            <Text size={"2"} weight={"medium"}>
              Pendaftaran KIP-K
            </Text>
            <Text size={"1"}>18:10</Text>
          </Flex>
          <Text color="gray" size={"2"}>
            Untuk informasi Selanju....
          </Text>
        </Box>
      </Link>
    </Box>
  );
}
