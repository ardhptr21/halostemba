"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FaceIcon, ImageIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Flex,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useSendTicketReply } from "~/apis/ticket/send-ticket-reply-api";
import {} from "~/validators/ticket/create-ticket-validator";
import {
  SendTicketReplyValidator,
  SendTicketReplyValidatorType,
} from "~/validators/ticket/send-ticket-reply-validator";

interface ChatFieldProps {
  ticketId: string;
  session: Session;
}

export default function ChatField({ ticketId, session }: ChatFieldProps) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();
  const { register, reset, handleSubmit } =
    useForm<SendTicketReplyValidatorType>({
      defaultValues: {
        message: "",
      },
      mode: "onChange",
      resolver: zodResolver(SendTicketReplyValidator),
    });

  const { mutate: handleSendReply } = useSendTicketReply({
    onError: (error) => {
      const message =
        error.response?.data.error || "Gagal membuat menfess, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies", ticketId],
      });
      reset();
    },
  });

  const onSubmit = handleSubmit((data) => {
    handleSendReply({
      ticketId: ticketId,
      token: session.token,
      message: data.message,
    });
  });

  return (
    <Flex
      direction={"row"}
      gap={"3"}
      align={"center"}
      width={"100%"}
      className="absolute bottom-0 left-0 right-0"
      asChild
    >
      <form action="" onSubmit={onSubmit}>
        <TextFieldRoot className="w-full" color="gray" variant="soft">
          <TextFieldSlot>
            <ImageIcon height="16" width="16" />
          </TextFieldSlot>
          <TextFieldInput
            placeholder="Ketik pesanmu disini..."
            size="3"
            style={{ width: "100%" }}
            {...register("message")}
          />
        </TextFieldRoot>
        <FaceIcon />
        <PaperPlaneIcon />
      </form>
    </Flex>
  );
}
