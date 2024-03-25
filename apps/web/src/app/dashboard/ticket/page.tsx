import AdminTicketDashboard from "~/components/organisms/dashboard/AdminTicketDashboard";
import TeacherTicketDashboard from "~/components/organisms/dashboard/TeacherTicketDashboard";
import { getAuthServer } from "~/lib/auth";

export default async function TicketDashboard() {
  const session = await getAuthServer();
  return (
    <>
      {session?.user.role === "ADMIN" ? (
        <AdminTicketDashboard session={session} />
      ) : (
        <TeacherTicketDashboard />
      )}
    </>
  );
}
