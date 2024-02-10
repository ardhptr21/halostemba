import { Flex } from "@radix-ui/themes";
import React from "react";
import { getListNotificationApiHandler } from "~/apis/notification/get-list-notification-api";
import NotificationCard from "~/components/molecules/notification/NotificationCard";
import { getAuthServer } from "~/lib/auth";

export default async function NotificationList() {
  const session = await getAuthServer();

  const data = await getListNotificationApiHandler(session?.token as string);

  return (
    <Flex direction="column" gap="3">
      {data.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </Flex>
  );
}
