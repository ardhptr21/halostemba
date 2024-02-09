import React, { PropsWithChildren } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import { Flex } from "@radix-ui/themes";

export default function NotificationLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full py-5  max-w-7xl mx-auto gap-5">
      <Sidebar />
      <Flex className="w-full h-[calc(100vh-40px)]">{children}</Flex>
    </main>
  );
}
