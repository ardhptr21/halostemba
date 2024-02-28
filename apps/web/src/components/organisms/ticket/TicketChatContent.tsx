"use client";

import { TicketEntity } from "@halostemba/entities";
import { Flex, ScrollArea } from "@radix-ui/themes";
import clsx from "clsx";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import { useGetListRepliesInfiniteApi } from "~/apis/ticket/get-list-replies-api";
import ChatBubble from "~/components/atoms/ticket/ChatBubble";
import PreviewTicketIssue from "~/components/atoms/ticket/PreviewTicketIssue";
import ActionTicketStatus from "~/components/molecules/ticket/ActionTicketStatus";
import ChatField from "~/components/molecules/ticket/ChatField";

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

  const handleScroll = (el: HTMLDivElement, smooth?: boolean) => {
    el.scrollTo({
      top: el.scrollHeight ** 10,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  const handleSendReply = () => {
    handleScroll(scrollAreaRef.current!, true);
  };

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (el) {
      if (firstTime && isFetched) {
        handleScroll(el);
        setFirstTime(false);
      } else if (scrollBottom) {
        handleScroll(el);
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
    <>
      <ScrollArea
        ref={scrollAreaRef}
        scrollbars="vertical"
        className={clsx("md:mb-auto", {
          "h-[calc(100%-120px)] mb-32": ticket.status === "OPEN",
        })}
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
                  <BeatLoader
                    className="inline-block"
                    color="white"
                    size={10}
                  />
                </Flex>
              ) : (
                <div ref={ref} />
              )}
              {data?.pages.map((page) =>
                page.data.map((reply) => (
                  <ChatBubble
                    key={reply.id}
                    self={
                      session.user.role === "ADMIN"
                        ? reply.authorId === ticket.responderId
                        : reply.authorId === session.user.id
                    }
                    reply={reply}
                  />
                )),
              )}
            </Flex>
          )}
          {ticket.status === "WAITING" && (
            <ActionTicketStatus session={session} ticketId={ticket.id} />
          )}
        </Flex>
      </ScrollArea>
      {ticket.status === "OPEN" && (
        <ChatField
          session={session!}
          ticketId={ticket.id}
          onSendReply={handleSendReply}
        />
      )}
    </>
  );
}
