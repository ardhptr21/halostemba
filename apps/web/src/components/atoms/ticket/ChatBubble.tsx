"use client";

import { MediaEntity, TicketReplyEntity } from "@halostemba/entities";
import { TrashIcon } from "@radix-ui/react-icons";
import { Card, ContextMenu, Flex, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { PropsWithChildren } from "react";
import { useDeleteTicketReply } from "~/apis/ticket/delete-ticket-reply-api";
interface Props {
  reply: TicketReplyEntity;
  self?: boolean;
}

export default function ChatBubble({ reply, self }: Props) {
  const [media1, media2]: [MediaEntity, MediaEntity[] | undefined] = [
    reply.medias?.at(0),
    reply.medias?.slice(1),
  ];

  return (
    <>
      <Wrapper replyId={reply.id} ticketId={reply.ticketId} self={self}>
        <Flex direction="column" justify="center" gap="2">
          {media1 && (
            <div className="w-72 aspect-square overflow-hidden rounded-md relative">
              {media1.type === "IMAGE" ? (
                <Image
                  src={media1.source}
                  fill
                  sizes="100%"
                  alt={media1.source}
                  objectFit="cover"
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={media1.source}
                  className="object-cover w-full h-full"
                  controls
                />
              )}
            </div>
          )}
          <Flex
            direction="row"
            justify="between"
            align="end"
            className="w-full"
            gap="3"
          >
            <Text size="2" className="max-w-xs">
              {reply.message}
            </Text>
            <Text size="1" color="gray">
              {format(new Date(reply.createdAt), "HH:mm")}
            </Text>
          </Flex>
        </Flex>
      </Wrapper>
      {!!media2?.length && (
        <Flex direction="column" gap="2">
          {media2.map((media) => (
            <Wrapper
              replyId={reply.id}
              ticketId={reply.ticketId}
              self={self}
              key={media.source}
            >
              <div className="w-72 aspect-square overflow-hidden rounded-md relative">
                {media.type === "IMAGE" ? (
                  <Image
                    src={media.source}
                    fill
                    sizes="100%"
                    alt={media.source}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    src={media.source}
                    className="object-cover w-full h-full"
                    controls
                  />
                )}
                <Text
                  size="1"
                  color="gray"
                  className="absolute right-1 bottom-1"
                >
                  {format(new Date(reply.createdAt), "HH:mm")}
                </Text>
              </div>
            </Wrapper>
          ))}
        </Flex>
      )}
    </>
  );
}

const Wrapper = ({
  children,
  self,
  replyId,
  ticketId,
}: PropsWithChildren & {
  self?: boolean;
  replyId: string;
  ticketId: string;
}) => {
  const { data: session } = useSession();
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate: deleteTicketReply } = useDeleteTicketReply({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies", ticketId] });
      toast("Berhasil menghapus.", { variant: "success" });
    },
    onError: () => {
      toast("Gagal menghapus.", { variant: "error" });
    },
  });

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Card
          className={clsx(["max-w-xs w-max"], {
            "bg-[#3E63DD]/55": !self,
            "bg-[#3E63DD] max-w-xs": self,
          })}
          ml={self ? "auto" : "0"}
        >
          {children}
        </Card>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item
          color="red"
          className="gap-3"
          onSelect={() => deleteTicketReply({ replyId, token: session!.token })}
        >
          Hapus
          <TrashIcon width={18} height={18} />
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
