import { Flex, Heading } from "@radix-ui/themes";
import AdminDashboardLayout from "~/components/layouts/admin/AdminDashboardLayout";
import NotificationList from "~/components/organisms/notification/NotificationList";

export default function DashboardNotification() {
  return (
    <AdminDashboardLayout>
      <Flex
        direction="column"
        gap="6"
        width="100%"
        className="px-16 py-9 mx-auto"
      >
        <Heading size="8">Notification</Heading>
        <NotificationList />
      </Flex>
    </AdminDashboardLayout>
  );
}
