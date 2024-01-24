import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { getTicketApiHandler } from "~/apis/ticket/get-ticket-api";
import ChatField from "~/components/atoms/ticket/ChatField";
import HeadTicketChat from "~/components/atoms/ticket/HeadTicketChat";
import PreviewTicketIssue from "~/components/atoms/ticket/PreviewTicketIssue";
import TicketChatList from "~/components/molecules/ticket/TicketChatList";
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
    <Flex direction={"column"} gap={"5"} height={"100%"} className="relative">
      <HeadTicketChat ticket={ticket} />
      <ScrollArea scrollbars="vertical" className="h-[calc(100%-150px)]">
        <Flex direction="column" gap="4">
          <PreviewTicketIssue
            media={ticket.medias}
            title={ticket.title}
            detail={ticket.detail}
          />
          {ticket.status !== "WAITING" && <TicketChatList ticketId={id} />}
          {ticket.status === "WAITING" && (
            <CalloutRoot variant="soft" color="cyan">
              <CalloutIcon>
                <InfoCircledIcon />
              </CalloutIcon>
              <CalloutText>Ticket-mu sedang di proses</CalloutText>
              <Text as="p" size="2" color="gray">
                Ticket-mu saat ini sedang dalam antrian untuk ditinjau oleh
                guru. Stay tuned, ya!
              </Text>
            </CalloutRoot>
          )}
        </Flex>
      </ScrollArea>
      {ticket.status === "OPEN" && <ChatField />}
    </Flex>
  );
}
