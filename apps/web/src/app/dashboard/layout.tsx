import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import DashboardNavbar from "~/components/molecules/dashboard/DashboardNavbar";
import withAuthRequired from "~/guards/auth/withAuthRequired";

function Layout({ children }: PropsWithChildren) {
  return (
    <main className="w-full flex flex-col">
      <DashboardNavbar />
      <Flex
        direction="column"
        gap="6"
        width="100%"
        className="px-16 py-9 mx-auto"
      >
        {children}
      </Flex>
    </main>
  );
}

export default withAuthRequired(Layout, {
  emailVerified: true,
  role: ["ADMIN", "TEACHER"],
});
