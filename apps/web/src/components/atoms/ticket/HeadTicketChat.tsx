import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

export default function HeadTicketChat() {
  return (
    <Box width={"100%"} className="border-b border-b-gray-500/70">
      <Flex justify={"between"} align={"center"} width={"100%"} p={"3"}>
        <Flex direction={"column"}>
          <Text weight={"bold"}>Pendaftaran KIP-K</Text>
          <Text size={"2"} color="gray">
            Pending
          </Text>
        </Flex>
        <DotsHorizontalIcon width={"20"} height={"20"} />
      </Flex>
    </Box>
  );
}
