import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Sidebar from "../molecules/sidebar/Sidebar";
import RightBarSide from "../molecules/sidebar/RightBarSide";
import Navbar from "../molecules/navbar/Navbar";
import TopNavbar from "../molecules/navbar/TopNavbar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="xl:flex-row w-full xl:py-5 max-w-7xl mx-auto px-4 xl:p-0 gap-5 flex flex-col">
      <TopNavbar />
      <Sidebar />
      <Flex className="w-full">{children}</Flex>
      <Navbar />
      <RightBarSide />
    </main>
  );
}
