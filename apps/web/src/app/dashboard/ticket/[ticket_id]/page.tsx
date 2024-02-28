import AdminDetailTicketDashboard from "~/components/organisms/dashboard/AdminDetailTicketDashboard";
import TeacherDetailTicketDashboard from "~/components/organisms/dashboard/TeacherDetailTicketDashboard";
import { getAuthServer } from "~/lib/auth";

interface Props {
  params: {
    ticket_id: string;
  };
}

export default async function TicketDetail({
  params: { ticket_id: ticketId },
}: Props) {
  const session = await getAuthServer();
  return (
    <>
      {session?.user.role === "ADMIN" ? (
        <AdminDetailTicketDashboard ticketId={ticketId} />
      ) : (
        <TeacherDetailTicketDashboard ticketId={ticketId} session={session!} />
      )}
    </>
  );
}
