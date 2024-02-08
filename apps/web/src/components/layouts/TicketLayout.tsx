import React, { PropsWithChildren } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import { Flex } from "@radix-ui/themes";
import Navbar from "../molecules/navbar/Navbar";

export default function TicketLayout({ children }: PropsWithChildren) {
  return (
    <main className="xl:flex-row w-full xl:py-5 max-w-7xl mx-auto px-4 xl:p-0 gap-5 flex flex-col">
      <Sidebar />
      <Flex className="w-full h-[calc(100vh-40px)] justify-center">
        {children}
      </Flex>
      <Navbar />
    </main>
  );
}
