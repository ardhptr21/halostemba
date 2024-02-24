import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import TeacherNavbar from "../../molecules/teacher/dashboardNavbar/TeacherNavbar";

export default function TeacherDashboardLayout({
  children,
}: PropsWithChildren) {
  return (
    <main className="w-full flex flex-col">
      <TeacherNavbar />
      <Flex className="w-full">{children}</Flex>
    </main>
  );
}
