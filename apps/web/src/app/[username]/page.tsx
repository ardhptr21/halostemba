import { Flex } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { getUserProfileApiHandler } from "~/apis/profile/get-user-profile";
import ProfileLayout from "~/components/layouts/ProfileLayout";
import ProfileDataCard from "~/components/molecules/profile/ProfileDataCard";
import ProfileTab from "~/components/molecules/profile/ProfileTab";
import { getAuthServer } from "~/lib/auth";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const getProfile = async (username: string) => {
  try {
    const ticket = await getUserProfileApiHandler(username);
    if (!ticket) throw notFound();
    return ticket;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) throw notFound();
    }
    throw error;
  }
};

export default async function ProfilePage({
  params: { username },
}: ProfilePageProps) {
  const profile = await getProfile(username);

  const session = await getAuthServer();

  return (
    <ProfileLayout>
      <Flex direction="column" gap="4" className="w-full">
        <ProfileDataCard
          name={profile.name}
          username={profile.username}
          bio={profile.bio}
          avatar={profile.avatar}
          self={false}
        />

        {profile.role === "STUDENT" && (
          <ProfileTab username={profile.username} token={session?.token} />
        )}
      </Flex>
    </ProfileLayout>
  );
}
