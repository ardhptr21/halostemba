import { Flex, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import TeacherDashboardLayout from "~/components/layouts/teacher/TeacherDashboardLayout";
import EditSettingsForm from "~/components/organisms/dashboard/settings/EditSettingsForm";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props {
  session: Session;
}

function DashboardSettings({ session }: Props) {
  return (
    <TeacherDashboardLayout>
      <Flex
        direction="column"
        gap="6"
        width="100%"
        className="px-16 py-9 mx-auto"
      >
        <Heading size="8">Settings</Heading>
        <EditSettingsForm session={session} />
      </Flex>
    </TeacherDashboardLayout>
  );
}

export default withAuthRequired(DashboardSettings);
