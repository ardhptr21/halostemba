import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  ScrollArea,
  TabsList,
  TabsRoot,
  TabsTrigger,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import React from "react";
import TicketChatPreview from "~/components/atoms/ticket/TicketChatPreview";

export default function TicketList() {
  return (
    <Box className="max-w-sm w-full  shrink-0">
      <Flex
        direction={"column"}
        className="max-w-sm top-0 fixed border-x w-full h-screen border-gray-500/70"
      >
        <TabsRoot className="w-full">
          <TabsList size="2" className="justify-center">
            <TabsTrigger className="w-1/3" value="TOP">
              Open
            </TabsTrigger>
            <TabsTrigger className="w-1/3" value="LATEST">
              Pending
            </TabsTrigger>
            <TabsTrigger className="w-1/3" value="REJECT">
              Reject
            </TabsTrigger>
          </TabsList>
        </TabsRoot>
        <Box p={"3"}>
          <TextFieldRoot className="w-full">
            <TextFieldSlot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextFieldSlot>
            <TextFieldInput
              placeholder="Cari ticket disini..."
              size="3"
              style={{ width: "100%" }}
            />
          </TextFieldRoot>
        </Box>
        <Flex direction={"column"} asChild>
          <ScrollArea scrollbars="vertical" className="h-full">
            <TicketChatPreview />
            <TicketChatPreview />
            <TicketChatPreview />
          </ScrollArea>
        </Flex>
      </Flex>
    </Box>
  );
}
