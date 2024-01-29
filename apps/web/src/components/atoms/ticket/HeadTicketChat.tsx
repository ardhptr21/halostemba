import { TicketEntity } from "@halostemba/entities";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";

interface Props {
  ticket: TicketEntity;
}

export default function HeadTicketChat({ ticket }: Props) {
  return (
    <Box width={"100%"} className="border-b border-b-gray-500/70">
      <Flex justify={"between"} align={"center"} width={"100%"} p={"3"}>
        <Flex direction={"column"}>
          <Text weight={"bold"}>Pendaftaran KIP-K</Text>
          <Text size={"2"} color="gray">
            {ticket.status === "OPEN" && (
              <>
                Ditanggapi oleh{" "}
                <Text weight="bold">{ticket.responder?.name}</Text>
              </>
            )}
            {ticket.status === "WAITING" && "Menunggu"}
            {ticket.status === "CLOSED" && <>Ditutup pada {ticket.closedAt}</>}
          </Text>
        </Flex>
        <DotsHorizontalIcon width={"20"} height={"20"} />
      </Flex>
    </Box>
  );
}
