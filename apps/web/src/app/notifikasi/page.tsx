import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import NotificationLayout from "~/components/layouts/NotificationLayout";
import NotificationList from "~/components/organisms/notification/NotificationList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

function page() {
  return (
    <NotificationLayout>
      <Flex direction="column" gap="5" width="100%" py="6">
        <Heading as="h1">Notifikasi</Heading>
        <NotificationList />
      </Flex>
    </NotificationLayout>
  );
}

export default withAuthRequired(page);
