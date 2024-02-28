import { Box, Flex } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { notFound } from "next/navigation";
import { getTicketApiHandler } from "~/apis/ticket/get-ticket-api";
import HeadTicketChat from "~/components/atoms/ticket/HeadTicketChat";
import TicketChatContent from "~/components/organisms/ticket/TicketChatContent";

interface Props {
  ticketId: string;
  session: Session;
}

const getTicket = async (token: string, id: string) => {
  try {
    const ticket = await getTicketApiHandler(token, id);
    console.log(ticket);
    if (!ticket) throw notFound();
    return ticket;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
      if (error.response?.status === 404) throw notFound();
    }
    throw error;
  }
};

export default async function TeacherDetailTicketDashboard({
  ticketId,
  session,
}: Props) {
  const ticket = await getTicket(session.token, ticketId);

  return (
    <Box className="relative" width="100%">
      <Flex direction="column" gap="5" height="100%" className="px-2 md:pl-3">
        <HeadTicketChat ticket={ticket} />
        <TicketChatContent session={session} ticket={ticket} />
      </Flex>
    </Box>
  );
}
