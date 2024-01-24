import { TicketReplyEntity } from "@halostemba/entities";
import { Card, Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";

interface Props {
  reply: TicketReplyEntity;
  self?: boolean;
}

export default function ChatBubble({ reply, self }: Props) {
  return (
    <Card
      className={!self ? "bg-[#3E63DD]/55 max-w-xs" : "bg-[#3E63DD] max-w-xs "}
      ml={self ? "auto" : "0"}
    >
      <Flex direction="column" justify="center" gap="1">
        <Flex direction="row" justify="between" align="end" className="w-full">
          <Text size="2" className="max-w-xs">
            {reply.message}
          </Text>
          <Text size="1" color="gray">
            {format(new Date(reply.createdAt), "HH:mm")}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
