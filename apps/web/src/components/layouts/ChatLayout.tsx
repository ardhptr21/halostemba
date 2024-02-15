import React, { PropsWithChildren } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import { Flex } from "@radix-ui/themes";
import Navbar from "../molecules/navbar/Navbar";

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <main className="xl:flex-row w-full max-w-7xl mx-auto flex xl:gap-4 flex-col">
      <Sidebar />
      <Flex className="w-full h-[calc(100vh-40px)] justify-center">
        {children}
      </Flex>
      <Navbar />
    </main>
  );
}
