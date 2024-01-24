import { Box } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";
import TicketLayout from "~/components/layouts/TicketLayout";
import TicketList from "~/components/molecules/ticket/TicketList";

export default function layout({ children }: PropsWithChildren) {
  return (
    <TicketLayout>
      <TicketList />
      <Box px={"3"} width={"100%"}>
        {children}
      </Box>
    </TicketLayout>
  );
}
