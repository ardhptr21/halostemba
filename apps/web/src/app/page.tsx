import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import MainLayout from "~/components/layouts/MainLayout";
import CalloutAction from "~/components/molecules/common/CalloutAction";
import MenfessCreate from "~/components/molecules/menfess/MenfessCreate";
import ListMenfess from "~/components/organisms/menfess/ListMenfess";
import { getAuthServer } from "~/lib/auth";

export const metadata: Metadata = {
  title: "halostemba",
};

async function Home() {
  const session = await getAuthServer();

  return (
    <MainLayout>
      <Flex direction="column" gap="4">
        <CalloutAction session={session} />
        {session?.user.role === "STUDENT" && (
          <MenfessCreate
            avatar={session?.user.avatar}
            name={session?.user.name}
          />
        )}
        <ListMenfess session={session} />
      </Flex>
    </MainLayout>
  );
}

export default Home;
