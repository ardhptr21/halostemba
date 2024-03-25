import { Flex } from "@radix-ui/themes";
import TicketLayout from "~/components/layouts/TicketLayout";
import TicketForm from "~/components/organisms/ticket/TicketForm";
import { getAuthServer } from "~/lib/auth";

export default async function TicketFormPage() {
  const session = await getAuthServer();

  return (
    <TicketLayout>
      <Flex gap="5" width="100%" className="max-w-3xl">
        <TicketForm session={session!} />
      </Flex>
    </TicketLayout>
  );
}
