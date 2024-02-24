"use client";

import { TicketEntity } from "@halostemba/entities";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  ScrollArea,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import clsx from "clsx";
import { Session } from "next-auth";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useListUserTicketApi } from "~/apis/ticket/list-user-ticket-api";
import TicketChatPreview from "~/components/atoms/ticket/TicketChatPreview";
import TicketChatPreviewSkeleton from "~/components/atoms/ticket/skeletons/TicketChatPreviewSkeleton";

interface Props {
  session: Session;
}

export default function TicketList({ session }: Props) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const [status, setStatus] = useState<any>(
    searchParams.get("status") || "OPEN",
  );
  const [search, setSearch] = useState("");
  const { data, isPending } = useListUserTicketApi(session.token, { status });
  const { id } = useParams();

  const orderChat = (data: TicketEntity[] | undefined) => {
    return data?.sort((a, b) => {
      const [lastReplyA, lastReplyB] = [
        a.ticketReplies?.at(0)?.createdAt,
        b.ticketReplies?.at(0)?.createdAt,
      ];

      if (lastReplyA && lastReplyB)
        return new Date(lastReplyB).getTime() - new Date(lastReplyA).getTime();

      if (!lastReplyB) return -1;
      if (!lastReplyA) return 1;

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  return (
    <Box
      className={clsx("max-w-xl w-full shrink-0", {
        "hidden md:block": pathname !== "/ticket",
      })}
    >
      <Flex
        direction={"column"}
        className="max-w-xl sm:border-x w-full h-screen border-gray-500/70"
      >
        <TabsRoot
          className="w-full"
          value={status}
          onValueChange={(value) => setStatus(value)}
        >
          <TabsList size="2" className="justify-center">
            <TabsTrigger className="w-1/2" value="OPEN">
              Open
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="REQUEST">
              Request
            </TabsTrigger>
          </TabsList>
        </TabsRoot>
        <Box p={"3"}>
          <TextFieldRoot className="w-full">
            <TextFieldSlot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextFieldSlot>
            <TextFieldInput
              placeholder="Cari tiket di sini..."
              size="3"
              style={{ width: "100%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </TextFieldRoot>
        </Box>

        <Flex direction={"column"} asChild>
          <ScrollArea scrollbars="vertical" className="h-full">
            {!isPending ? (
              !!data?.length ? (
                orderChat(data)
                  ?.filter((ticket) => ticket.title.includes(search))
                  ?.map((ticket) => (
                    <TicketChatPreview
                      key={ticket.id}
                      ticket={ticket}
                      active={ticket.id === id}
                    />
                  ))
              ) : (
                <Flex mt="9" direction="column" justify="center" align="center">
                  <Text as="p" size="3" color="gray">
                    Tidak ada tiket di sini
                  </Text>
                </Flex>
              )
            ) : (
              Array.from({ length: 12 }).map((_, i) => (
                <TicketChatPreviewSkeleton key={i} />
              ))
            )}
          </ScrollArea>
        </Flex>
      </Flex>
    </Box>
  );
}
