import { BellIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import React from "react";
import { getNotificationCountApiHandler } from "~/apis/notification/get-notification-count-api";

interface Props {
  session?: Session | null;
}

export default async function NotificationIcon({ session }: Props) {
  if (!session) return <p>a</p>;

  const data = await getNotificationCountApiHandler(session.token as string);

  return (
    <div className="relative">
      <div className="absolute w-2 h-2 p-2 rounded-full bg-red-500 left-2 bottom-2 flex justify-center items-center">
        <Text size="1">{data.count}</Text>
      </div>
      <BellIcon width={20} height={"100%"} />
    </div>
  );
}
