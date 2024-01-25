import { Flex } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { getTicketApiHandler } from "~/apis/ticket/get-ticket-api";
import HeadTicketChat from "~/components/atoms/ticket/HeadTicketChat";
import TicketChatContent from "~/components/organisms/ticket/TicketChatContent";
import { getAuthServer } from "~/lib/auth";

interface Props {
  params: { id: string };
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

export default async function TicketDetailPage({ params: { id } }: Props) {
  const session = await getAuthServer();
  const ticket = await getTicket(session!.token, id);

  return (
    <Flex direction="column" gap="5" height="100%" className="">
      <HeadTicketChat ticket={ticket} />
      <TicketChatContent session={session!} ticket={ticket} />
    </Flex>
  );
}
