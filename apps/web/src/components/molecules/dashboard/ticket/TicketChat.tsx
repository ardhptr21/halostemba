import { Box, Card, Flex } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import React from "react";
import { getTicketApiHandler } from "~/apis/ticket/get-ticket-api";
import HeadTicketChat from "~/components/atoms/ticket/HeadTicketChat";
import TicketChatContent from "~/components/organisms/ticket/TicketChatContent";
import { getAuthServer } from "~/lib/auth";

interface Props {
  ticketId: string;
}

const getTicket = async (token: string, id: string) => {
  try {
    const ticket = await getTicketApiHandler(token, id);
    if (!ticket) throw notFound();
    return ticket;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) throw notFound();
    }
    throw error;
  }
};

export default async function TicketChat({ ticketId }: Props) {
  const session = await getAuthServer();
  const ticket = await getTicket(session!.token, ticketId);

  return (
    <Box className="relative" width="100%">
      <Card className="h-full overflow-y-auto">
        <Flex direction="column" gap="5" height="100%" className="px-2 md:pl-3">
          <HeadTicketChat ticket={ticket} session={session!} />
          <TicketChatContent session={session!} ticket={ticket} />
        </Flex>
      </Card>
    </Box>
  );
}
