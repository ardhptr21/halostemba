"use client";

import { Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useNotificationCountApi } from "~/apis/notification/get-notification-count-api";

interface Props {
  count: number;
  session: Session;
}

export default function BadgeNotificationImpl({ count, session }: Props) {
  const { data } = useNotificationCountApi(session.token, {
    initialData: { count },
    refetchInterval: 1000 * 60 * 5,
  });

  if (!data?.count) return <div></div>;

  return (
    <div className="absolute w-2 h-2 p-2 rounded-full bg-red-500/85 -right-1 -top-1 flex justify-center items-center">
      <Text as="p" size="1">
        {data.count}
      </Text>
    </div>
  );
}
