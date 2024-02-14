import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { getListNotificationApiHandler } from "~/apis/notification/get-list-notification-api";
import NotificationCard from "~/components/molecules/notification/NotificationCard";
import { getAuthServer } from "~/lib/auth";

export default async function NotificationList() {
  const session = await getAuthServer();

  const data = await getListNotificationApiHandler(session?.token as string);

  return (
    <Flex direction="column" gap="3" height="100%">
      {data.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
      {data.length === 0 && (
        <Flex direction="column" justify="center" align="center" my="auto">
          <Image
            src="/assets/images/notification/bell.png"
            alt="Bell"
            width={200}
            height={200}
          />
          <Text size="3" align="center" weight="bold">
            Tidak ada notifikasi
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
