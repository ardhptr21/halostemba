import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import AdminNavbar from "../../molecules/admin/dashboardNavbar/AdminNavbar";

export default function AdminDashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full flex flex-col">
      <AdminNavbar />
      <Flex className="w-full">{children}</Flex>
    </main>
  );
}
