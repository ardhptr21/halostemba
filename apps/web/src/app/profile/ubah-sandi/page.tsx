import { Flex } from "@radix-ui/themes";
import { Session } from "next-auth";
import ProfileLayout from "~/components/layouts/ProfileLayout";
import EditPasswordForm from "~/components/organisms/profile/EditPasswordForm";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface EditPasswordProps {
  session: Session;
}

function EditPassword({ session }: EditPasswordProps) {
  return (
    <ProfileLayout>
      <Flex direction="column" gap="4" className="w-full">
        <EditPasswordForm session={session} />
      </Flex>
    </ProfileLayout>
  );
}

export default withAuthRequired(EditPassword);
