import { Flex } from "@radix-ui/themes";
import { Session } from "next-auth";
import ProfileLayout from "~/components/layouts/ProfileLayout";
import ProfileDataCard from "~/components/molecules/profile/ProfileDataCard";
import ProfileTab from "~/components/molecules/profile/ProfileTab";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface ProfilePageProps {
  session: Session;
}

function ProfilePage({ session }: ProfilePageProps) {
  return (
    <ProfileLayout>
      <Flex direction="column" gap="4" className="w-full">
        <ProfileDataCard
          name={session.user.name}
          username={session.user.username}
          bio={session.user.bio}
          avatar={session.user.avatar}
          self={true}
          session={session}
        />

        {session.user.role === "STUDENT" && (
          <ProfileTab username={session?.user.username} token={session.token} />
        )}
      </Flex>
    </ProfileLayout>
  );
}

export default withAuthRequired(ProfilePage);
