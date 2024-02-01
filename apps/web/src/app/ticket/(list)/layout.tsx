import { Box } from "@radix-ui/themes";
import { Session } from "next-auth";
import { PropsWithChildren } from "react";
import TicketLayout from "~/components/layouts/TicketLayout";
import TicketList from "~/components/molecules/ticket/TicketList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props extends PropsWithChildren {
  session: Session;
}

function layout({ children, session }: Props) {
  return (
    <TicketLayout>
      <TicketList session={session} />
      <Box px="3" className="relative" width="100%">
        {children}
      </Box>
    </TicketLayout>
  );
}

export default withAuthRequired(layout, {
  role: ["ADMIN", "STUDENT"],
});
