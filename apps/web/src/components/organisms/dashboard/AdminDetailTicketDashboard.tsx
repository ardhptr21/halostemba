import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import TicketChat from "~/components/molecules/dashboard/ticket/TicketChat";
import DetailTicket from "~/components/molecules/dashboard/ticket/TicketDetail";

interface Props {
  ticketId: string;
}

export default function AdminDetailTicketDashboard({ ticketId }: Props) {
  return (
    <>
      <Flex direction="row" width="100%" justify="between">
        <Link href="/admin/ticket">
          <Flex direction="row" gap="2" align="center">
            <ChevronLeftIcon width={30} height={30} />
            <Heading size="8">Detail Ticket</Heading>
          </Flex>
        </Link>
      </Flex>
      <Flex width="100%" justify="between" gap="9" className="max-h-screen">
        <DetailTicket ticketId={ticketId} />
        <TicketChat ticketId={ticketId} />
      </Flex>
    </>
  );
}
