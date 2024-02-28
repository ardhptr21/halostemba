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
import { Session } from "next-auth";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  IsTicketTeacher,
  useGetTicketListApi,
} from "~/apis/ticket/get-list-ticket-api";
import TicketChatPreview from "~/components/atoms/ticket/TicketChatPreview";
import TicketChatPreviewSkeleton from "~/components/atoms/ticket/skeletons/TicketChatPreviewSkeleton";

interface Props {
  session: Session;
}

export default function TicketListTeacher({ session }: Props) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<any>(
    searchParams.get("status") || "OPEN",
  );
  const [search, setSearch] = useState("");

  const { data, isPending } = useGetTicketListApi<IsTicketTeacher>(
    session.token,
    {
      status,
    },
  );
  const { ticket_id: id } = useParams();

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
    <Box className="sm:max-w-xl w-full xl:shrink-0">
      <Flex
        direction="column"
        className="sm:max-w-xl sm:border-r w-full h-[calc(100vh+40px)] border-gray-500/70"
      >
        <TabsRoot className="w-full" value={status} onValueChange={setStatus}>
          <TabsList size="2" className="justify-center">
            <TabsTrigger className="w-1/3" value="WAITING">
              Pending
            </TabsTrigger>
            <TabsTrigger className="w-1/3" value="OPEN">
              Open
            </TabsTrigger>
            <TabsTrigger className="w-1/3" value="CLOSED">
              Closed
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
                      path="/dashboard/ticket"
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
