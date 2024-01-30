import { Flex } from "@radix-ui/themes";
import { Session } from "next-auth";
import ProfileLayout from "~/components/layouts/ProfileLayout";
import EditProfileForm from "~/components/organisms/profile/EditProfileForm";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface EditProfileProps {
  session: Session;
}

function EditProfile({ session }: EditProfileProps) {
  return (
    <ProfileLayout>
      <Flex direction="column" gap="4" className="w-full">
        <EditProfileForm session={session} />
      </Flex>
    </ProfileLayout>
  );
}

export default withAuthRequired(EditProfile);
