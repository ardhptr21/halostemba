import {
  Flex,
  Heading,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import TicketFilter from "~/components/molecules/dashboard/ticket/TicketFilter";
import TicketList from "~/components/molecules/dashboard/ticket/TicketList";

interface Props {
  session?: Session | null;
}
export default function AdminTicketDashboard({ session }: Props) {
  return (
    <>
      <Flex direction="row" width="100%" justify="between">
        <Heading size="8">Ticket</Heading>
        <Flex direction="row" gap="4">
          <TicketFilter />
        </Flex>
      </Flex>
      <Flex>
        <Flex direction="row" gap="3" align="center">
          <Text color="gray">Tampilkan</Text>
          <SelectRoot size="1">
            <SelectTrigger placeholder="10" />
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </SelectRoot>
          <Text color="gray">Data</Text>
        </Flex>
      </Flex>
      <TicketList session={session} />
    </>
  );
}
