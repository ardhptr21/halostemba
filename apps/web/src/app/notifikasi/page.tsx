import { Flex, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import NotificationLayout from "~/components/layouts/NotificationLayout";
import NotificationList from "~/components/organisms/notification/NotificationList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props {
  session: Session;
}

function Notification({ session }: Props) {
  return (
    <NotificationLayout>
      <Flex direction="column" gap="5" width="100%" py="6">
        <Heading as="h1">Notifikasi</Heading>
        <NotificationList session={session} />
      </Flex>
    </NotificationLayout>
  );
}

export default withAuthRequired(Notification);
