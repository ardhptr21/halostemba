import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

export default function TicketChatPreview() {
  return (
    <Box width={"100%"} p={"3"}>
      <Box className="border-b border-b-gray-500/70" pb={"3"}>
        <Flex justify={"between"} width={"100%"} gap={"3"}>
          <Text>Pendaftaran KIP-K</Text>
          <Text>18:10</Text>
        </Flex>
        <Text color="gray" size={"2"}>
          Untuk informasi Selanju....
        </Text>
      </Box>
    </Box>
  );
}
