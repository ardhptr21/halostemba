import { Box } from "@radix-ui/themes";
import { Session } from "next-auth";
import { PropsWithChildren } from "react";
import ChatLayout from "~/components/layouts/ChatLayout";
import TicketList from "~/components/molecules/ticket/TicketList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props extends PropsWithChildren {
  session: Session;
}

function layout({ children, session }: Props) {
  return (
    <ChatLayout>
      <TicketList session={session} />
      <Box px="3" className="hidden sm:flex relative" width="100%">
        {children}
      </Box>
    </ChatLayout>
  );
}

export default withAuthRequired(layout, {
  role: ["ADMIN", "STUDENT"],
});
