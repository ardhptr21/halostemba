import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import React from "react";
import MainLayout from "~/components/layouts/MainLayout";
import TicketForm from "~/components/organisms/ticket/TicketForm";

export default function page() {
  return (
    <MainLayout>
      <Flex gap={"5"} width={"100%"}>
        <ArrowLeftIcon width={30} height={30} />
        <TicketForm />
      </Flex>
    </MainLayout>
  );
}
