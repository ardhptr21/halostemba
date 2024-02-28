import { Flex, Heading } from "@radix-ui/themes";
import NotificationList from "~/components/organisms/notification/NotificationList";

export default function NotifikasiDashboard() {
  return (
    <>
      <Flex direction="column" gap="5" width="100%" py="6">
        <Heading as="h1">Notifikasi</Heading>
        <NotificationList />
      </Flex>
    </>
  );
}
