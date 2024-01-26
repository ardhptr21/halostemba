import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { Session } from "next-auth";
import React from "react";
import TicketLayout from "~/components/layouts/TicketLayout";
import TicketForm from "~/components/organisms/ticket/TicketForm";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props {
  session: Session;
}

function page({ session }: Props) {
  return (
    <TicketLayout>
      <Flex gap="5" width="100%" className="max-w-3xl">
        <ArrowLeftIcon width={30} height={30} />
        <TicketForm session={session} />
      </Flex>
    </TicketLayout>
  );
}

export default withAuthRequired(page);
