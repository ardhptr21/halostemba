import { PropsWithChildren } from "react";
import ChatLayout from "~/components/layouts/ChatLayout";
import TicketList from "~/components/molecules/ticket/TicketList";
import { getAuthServer } from "~/lib/auth";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getAuthServer();
  return (
    <ChatLayout>
      <TicketList session={session!} />
      {children}
    </ChatLayout>
  );
}
