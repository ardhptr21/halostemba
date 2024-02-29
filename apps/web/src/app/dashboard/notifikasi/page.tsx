import { Flex, Heading } from "@radix-ui/themes";
import NotificationList from "~/components/organisms/notification/NotificationList";
import { getAuthServer } from "~/lib/auth";

export default async function NotifikasiDashboard() {
  const session = await getAuthServer();

  return (
    <>
      <Flex direction="column" gap="5" width="100%" py="6">
        <Heading as="h1">Notifikasi</Heading>
        <NotificationList session={session!} />
      </Flex>
    </>
  );
}
