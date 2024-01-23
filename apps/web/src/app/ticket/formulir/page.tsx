import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import React from "react";
import TicketLayout from "~/components/layouts/TicketLayout";
import TicketForm from "~/components/organisms/ticket/TicketForm";

export default function page() {
  return (
    <TicketLayout>
      <Flex gap={"5"} width={"100%"} className="max-w-3xl">
        <ArrowLeftIcon width={30} height={30} />
        <TicketForm />
      </Flex>
    </TicketLayout>
  );
}
