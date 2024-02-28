import { getNotificationCountApiHandler } from "~/apis/notification/get-notification-count-api";
import { getAuthServer } from "~/lib/auth";
import BadgeNotificationImpl from "./BadgeNotificationImpl";

export default async function BadgeNotification() {
  const session = await getAuthServer();
  if (!session) return null;

  const data = await getNotificationCountApiHandler(session!.token as string);

  return <BadgeNotificationImpl count={data.count} session={session} />;
}
