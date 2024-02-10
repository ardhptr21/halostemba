import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import NotificationLayout from "~/components/layouts/NotificationLayout";
import NotificationList from "~/components/organisms/notification/NotificationList";
import withAuthRequired from "~/guards/auth/withAuthRequired";

function page() {
  return (
    <NotificationLayout>
      <Flex direction="column" gap="2" width="100%">
        <Heading as="h1">Notifcations</Heading>
        <NotificationList />
      </Flex>
    </NotificationLayout>
  );
}

export default withAuthRequired(page);
