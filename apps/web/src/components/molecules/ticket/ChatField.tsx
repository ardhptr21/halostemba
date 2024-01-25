"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FaceIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, ScrollArea } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useSnackbar } from "notistack";
import { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useSendTicketReply } from "~/apis/ticket/send-ticket-reply-api";
import PreviewMediaTick from "~/components/atoms/PreviewMediaTick";
import UploadMediaChat from "~/components/atoms/ticket/UploadMediaChat";
import {
  useMediaStoreChat,
  usePreviewMediaStoreChat,
} from "~/store/media/chat-media-store";
import {} from "~/validators/ticket/create-ticket-validator";
import {
  SendTicketReplyValidator,
  SendTicketReplyValidatorType,
} from "~/validators/ticket/send-ticket-reply-validator";

interface ChatFieldProps {
  ticketId: string;
  session: Session;
  onSendReply?: (data: SendTicketReplyValidatorType) => void;
}

export default function ChatField({
  ticketId,
  session,
  onSendReply,
}: ChatFieldProps) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();
  const { media } = useMediaStoreChat();
  const { previewMedia, removePreviewMedia } = usePreviewMediaStoreChat();

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
    onSendReply?.(data);
    handleSendReply({
      ticketId: ticketId,
      token: session.token,
      message: data.message,
    });
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className="w-full absolute -bottom-5 p-2 bg-[#18191B] left-0 right-0 h-auto">
      {!!previewMedia?.length ? (
        <ScrollArea scrollbars="horizontal" className="mb-3">
          <Flex className="w-max h-14 mb-2" gap="2">
            {previewMedia.map((m) => (
              <PreviewMediaTick
                onRemove={() => removePreviewMedia(m.preview)}
                preview={m.preview}
                type={m.type}
                key={m.preview}
                progress={media[m.preview]?.progress}
              />
            ))}
          </Flex>
        </ScrollArea>
      ) : null}
      <Flex direction="row" gap="2" align="end" width="100%" asChild>
        <form action="" onSubmit={onSubmit}>
          <div
            className="rt-TextAreaRoot rt-r-size-2 rt-variant-surface w-full"
            style={{
              minHeight: "var(--space-7)",
            }}
          >
            <TextareaAutosize
              maxRows={10}
              minRows={1}
              onKeyDown={handleKeyDown}
              className="rt-TextAreaInput"
              placeholder="Apa yang sedang terjadi !?"
              {...register("message")}
            />
            <div className="rt-TextAreaChrome"></div>
          </div>
          <UploadMediaChat />
          <IconButton
            className="cursor-pointer"
            size="3"
            variant="surface"
            color="gray"
            type="button"
          >
            <FaceIcon />
          </IconButton>
          <IconButton
            className="cursor-pointer"
            size="3"
            variant="surface"
            color="gray"
            type="submit"
          >
            <PaperPlaneIcon />
          </IconButton>
        </form>
      </Flex>
    </div>
  );
}