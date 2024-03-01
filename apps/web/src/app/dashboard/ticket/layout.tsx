import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import TicketListTeacher from "~/components/molecules/dashboard/ticket/TicketListTeacher";
import { getAuthServer } from "~/lib/auth";

export default async function layout({ children }: PropsWithChildren) {
  const session = await getAuthServer();

  if (session?.user.role === "ADMIN") return <>{children}</>;

  return (
    <Flex className="w-full relative h-screen">
      <TicketListTeacher session={session!} />
      {children}
    </Flex>
  );
}
