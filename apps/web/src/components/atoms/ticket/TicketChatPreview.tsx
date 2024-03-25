import { TicketEntity } from "@halostemba/entities";
import { Box, Flex, Text } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import { formatDateChatDisplay } from "~/lib/utils";

interface Props {
  ticket: TicketEntity;
  active?: boolean;
  path?: string;
}

export default function TicketChatPreview({
  ticket,
  active,
  path = "/ticket",
}: Props) {
  const latestReply = ticket.ticketReplies?.at(0);

  return (
    <Box
      width="100%"
      py="2"
      px="4"
      asChild
      className={clsx("border-b border-white/10 first:border-t", {
        "hover:bg-[#3E63DD]/25": !active,
        "bg-[#3E63DD]/50": active,
      })}
    >
      <Link
        href={`${path}/${ticket.id}?status=${ticket.status}`}
        className="inline-block"
      >
        <Flex justify="between" width="100%" gap="3">
          <Text
            as="p"
            size="3"
            weight="medium"
            className="max-w-[15rem] truncate"
          >
            {ticket.title}
          </Text>
          <Text size="1">
            {formatDateChatDisplay(latestReply?.createdAt ?? ticket.createdAt)}
          </Text>
        </Flex>
        <Text color="gray" size="2" as="p" className="max-w-[15rem] truncate">
          {latestReply?.message ?? ticket.detail}
        </Text>
      </Link>
    </Box>
  );
}
