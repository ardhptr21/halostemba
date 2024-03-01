"use client";

import { CheckCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useRespondToTicket } from "~/apis/ticket/respond-to-ticket-api";

interface Props {
  session: Session;
  ticketId: string;
}

export default function ActionTicketStatus({ session, ticketId }: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const router = useRouter();
  const { mutate, isPending } = useRespondToTicket({
    onSuccess: () => {
      toast({
        message: "Berhasil menanggapi ticket.",
        variant: "success",
      });
      router.push(`/dashboard/ticket/${ticketId}?status=OPEN`);
    },
    onError: () => {
      toast({
        message: "Gagal menanggapi, coba lagi.",
        variant: "error",
      });
    },
  });

  const handleResponseToTicket = () => {
    mutate({ token: session.token, ticketId });
  };
  return (
    <>
      {session.user.role === "STUDENT" && (
        <CalloutRoot variant="soft" color="cyan">
          <CalloutIcon>
            <InfoCircledIcon />
          </CalloutIcon>
          <CalloutText>Ticket-mu sedang di proses</CalloutText>
          <Text as="p" size="2" color="gray">
            Ticket-mu saat ini sedang dalam antrian untuk ditinjau oleh guru.
            Stay tuned, ya!
          </Text>
        </CalloutRoot>
      )}
      {session.user.role === "TEACHER" && (
        <Button
          size="4"
          className="cursor-pointer"
          color="green"
          variant="soft"
          onClick={handleResponseToTicket}
          disabled={isPending}
        >
          <CheckCircledIcon width={20} height={20} />
          Terima & Tanggapi Ticket
        </Button>
      )}
    </>
  );
}
