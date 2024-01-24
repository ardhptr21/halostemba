import { Flex, ScrollArea, Separator, Text } from "@radix-ui/themes";
import React from "react";
import ChatBubble from "~/components/atoms/ticket/ChatBubble";
import ChatField from "~/components/atoms/ticket/ChatField";
import HeadTicketChat from "~/components/atoms/ticket/HeadTicketChat";
import PreviewTicketIssue from "~/components/atoms/ticket/PreviewTicketIssue";

export default function page() {
  return (
    <Flex direction={"column"} gap={"5"} height={"100%"} className="relative">
      <HeadTicketChat />
      <Flex asChild direction={"column"} className="h-[calc(100%-150px)]">
        <ScrollArea scrollbars="vertical">
          <PreviewTicketIssue />
          <Flex
            gap={"3"}
            align={"center"}
            justify={"center"}
            width={"100%"}
            my={"4"}
          >
            <Separator size={"3"} />
            <Text weight={"medium"}>Hari ini</Text>
            <Separator size={"3"} />
          </Flex>
          <Flex direction={"column"} gap={"3"}>
            <ChatBubble img="/assets/images/ticket/chat-bubble.png" />
            <ChatBubble />
            <ChatBubble self />
            <ChatBubble self />
          </Flex>
        </ScrollArea>
      </Flex>
      <ChatField />
    </Flex>
  );
}
