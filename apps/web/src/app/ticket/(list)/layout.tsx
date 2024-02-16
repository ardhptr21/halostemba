import { Session } from "next-auth";
import { PropsWithChildren } from "react";
import ChatLayout from "~/components/layouts/ChatLayout";
import TicketList from "~/components/molecules/ticket/TicketList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props extends PropsWithChildren {
  session: Session;
}

function Layout({ children, session }: Props) {
  return (
    <ChatLayout>
      <TicketList session={session} />
      {children}
    </ChatLayout>
  );
}

export default withAuthRequired(Layout, {
  role: ["ADMIN", "STUDENT"],
});
