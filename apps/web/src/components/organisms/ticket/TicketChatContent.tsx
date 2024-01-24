"use client";

import { TicketEntity } from "@halostemba/entities";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import { useGetListRepliesInfiniteApi } from "~/apis/ticket/get-list-replies-api";
import ChatBubble from "~/components/atoms/ticket/ChatBubble";
import PreviewTicketIssue from "~/components/atoms/ticket/PreviewTicketIssue";

interface Props {
  session: Session;
  ticket: TicketEntity;
}

export default function TicketChatContent({ ticket, session }: Props) {
  const [firstTime, setFirstTime] = useState(true);
  const [scrollBottom, setScrollBottom] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    data,
    isFetching,
    isFetched,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetListRepliesInfiniteApi(ticket.id, session.token, { perPage: 20 });

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (el) {
      if (firstTime && isFetched) {
        el.scrollTop = el.scrollHeight;
        setFirstTime(false);
      } else if (scrollBottom) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [data, scrollAreaRef, isFetched, firstTime, scrollBottom]);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (el) {
      el.addEventListener("scroll", () => {
        setScrollBottom(
          Math.floor(el.scrollTop + el.clientHeight) === el.scrollHeight,
        );
      });
    }
  }, [scrollAreaRef, setScrollBottom]);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      scrollbars="vertical"
      className="h-[calc(100%-150px)]"
    >
      <Flex direction="column" gap="4" justify="end" width="100%">
        <PreviewTicketIssue
          media={ticket.medias}
          title={ticket.title}
          detail={ticket.detail}
        />

        {ticket.status !== "WAITING" && (
          <Flex direction="column" gap="3" justify="end" width="100%">
            {isFetching || isFetchingNextPage ? (
              <Flex justify="center" align="center" py="2">
                <BeatLoader className="inline-block" color="white" size={10} />
              </Flex>
            ) : (
              <div ref={ref} />
            )}
            {data?.pages.map((page) =>
              page.data.map((reply) => (
                <ChatBubble
                  key={reply.id}
                  self={reply.authorId === session.user.id}
                  reply={reply}
                />
              )),
            )}
          </Flex>
        )}
        {ticket.status === "WAITING" && (
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
      </Flex>
    </ScrollArea>
  );
}
