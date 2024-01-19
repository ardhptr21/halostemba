import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import TrendingSide from "../molecules/sidebar/TrendingSide";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full py-5 max-w-7xl mx-auto gap-5">
      <Sidebar />
      <Flex className=" w-full">{children}</Flex>
      <TrendingSide />
    </main>
  );
}
