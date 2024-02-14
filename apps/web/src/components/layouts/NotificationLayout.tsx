import React, { PropsWithChildren } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import { Flex } from "@radix-ui/themes";
import Navbar from "../molecules/navbar/Navbar";

export default function NotificationLayout({ children }: PropsWithChildren) {
  return (
    <main className="md:flex-row w-full md:py-5 max-w-7xl mx-auto px-4 xl:p-0  gap-5 flex flex-col">
      <Sidebar />
      <Flex className="w-full h-[calc(100vh-40px)]">{children}</Flex>
      <Navbar />
    </main>
  );
}
