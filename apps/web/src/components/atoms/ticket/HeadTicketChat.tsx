"use client";

import { TicketEntity } from "@halostemba/entities";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Popover, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useCloseTicket } from "~/apis/ticket/close-ticket-api";

interface Props {
  ticket: TicketEntity;
  session: Session;
}

export default function HeadTicketChat({ ticket, session }: Props) {
  const [openPopover, setOpenPopover] = useState(false);
  const { enqueueSnackbar: toast } = useSnackbar();
  const router = useRouter();

  const { mutate: handleCloseTicket } = useCloseTicket({
    onSuccess: () => {
      setOpenPopover(!openPopover);
      toast("Berhasil menutup ticket.", { variant: "success" });
      router.push(`/dashboard/ticket/${ticket.id}?status=CLOSED`);
    },
    onError: () => {
      toast("Gagal menutup ticket.", { variant: "error" });
    },
  });

  return (
    <Box width={"100%"} className="border-b border-b-gray-500/70">
      <Flex justify={"between"} align={"center"} width={"100%"} p={"3"}>
        <Flex direction={"column"}>
          <Text weight={"bold"}>{ticket.title}</Text>
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
        <Popover.Root open={openPopover} onOpenChange={setOpenPopover}>
          <Popover.Trigger
            className={ticket.status === "CLOSED" ? "hidden" : "cursor-pointer"}
          >
            <DotsHorizontalIcon
              width={"20"}
              height={"20"}
              className="cursor-pointer"
            />
          </Popover.Trigger>
          <Popover.Content
            align="end"
            onClick={() =>
              handleCloseTicket({
                token: session.token as string,
                ticketId: ticket.id,
              })
            }
          >
            <Flex direction="column" className="min-w-32" gap="3">
              <Button className="w-full cursor-pointer" color="red">
                Tutup
              </Button>
            </Flex>
          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Box>
  );
}
