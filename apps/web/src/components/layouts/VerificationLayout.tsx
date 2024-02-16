import React, { PropsWithChildren } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import { Flex } from "@radix-ui/themes";
import Navbar from "../molecules/navbar/Navbar";

export default function VerificationLayout({ children }: PropsWithChildren) {
  return (
    <main className="xl:flex-row w-full xl:gap-4 max-w-7xl mx-auto flex flex-col">
      <Sidebar />
      <Flex className="w-full justify-center">{children}</Flex>
      <Navbar />
    </main>
  );
}
