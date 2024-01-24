import { Flex } from "@radix-ui/themes";
import ChatBubble from "~/components/atoms/ticket/ChatBubble";

interface Props {
  ticketId: string;
}

export default function TicketChatList({}: Props) {
  return (
    <Flex direction="column" gap="3">
      <ChatBubble />
      <ChatBubble self />
      <ChatBubble self />
    </Flex>
  );
}
