import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Navbar from "../molecules/dashboardNavbar/Navbar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full flex flex-col">
      <Navbar />
      <Flex className="w-full">{children}</Flex>
    </main>
  );
}
