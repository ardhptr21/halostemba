import { Heading } from "@radix-ui/themes";
import EditSettingsForm from "~/components/organisms/dashboard/EditSettingsForm";
import { getAuthServer } from "~/lib/auth";

export default async function DashboardSettings() {
  const session = await getAuthServer();
  return (
    <>
      <Heading size="8">Settings</Heading>
      <EditSettingsForm session={session!} />
    </>
  );
}
