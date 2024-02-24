import { Session } from "next-auth";
import { PropsWithChildren } from "react";
import TeacherDashboardLayout from "~/components/layouts/teacher/TeacherDashboardLayout";
import TicketList from "~/components/molecules/ticket/TicketList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props extends PropsWithChildren {
  session: Session;
}

function Layout({ children, session }: Props) {
  return (
    <TeacherDashboardLayout>
      <TicketList session={session} />
      {children}
    </TeacherDashboardLayout>
  );
}

export default withAuthRequired(Layout, {
  role: ["TEACHER"],
});
