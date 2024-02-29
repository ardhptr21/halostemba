"use client";

import { Flex, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect } from "react";
import { useListNotificationApi } from "~/apis/notification/get-list-notification-api";
import NotificationCard from "~/components/molecules/notification/NotificationCard";

interface Props {
  session: Session;
}

export default function NotificationList({ session }: Props) {
  const { data, isFetching, isSuccess, isFetched } = useListNotificationApi(
    session.token,
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["notification-count"] });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isFetched]);

  if (isFetching || !data) return null;

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
