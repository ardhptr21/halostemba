import { Session } from "next-auth";
import { PropsWithChildren } from "react";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import TicketList from "~/components/molecules/ticket/TicketList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props extends PropsWithChildren {
  session: Session;
}

function Layout({ children, session }: Props) {
  return (
    <DashboardLayout>
      <TicketList session={session} />
      {children}
    </DashboardLayout>
  );
}

export default withAuthRequired(Layout, {
  role: ["TEACHER"],
});
