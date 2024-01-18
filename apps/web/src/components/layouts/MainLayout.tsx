import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import TrendingSide from "../molecules/sidebar/TrendingSide";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full max-w-7xl mx-auto gap-5">
      <Sidebar />
      <Flex className="py-5 w-full">{children}</Flex>
      <TrendingSide />
    </main>
  );
}
