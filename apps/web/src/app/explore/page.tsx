import { Flex } from "@radix-ui/themes";
import MainLayout from "~/components/layouts/MainLayout";
import MenfessExplorer from "~/components/organisms/menfess/MenfessExplorer";
import { getAuthServer } from "~/lib/auth";

export default async function ExplorePage() {
  const session = await getAuthServer();

  return (
    <MainLayout>
      <Flex direction="column" gap="4" className="w-full">
        <MenfessExplorer session={session} />
      </Flex>
    </MainLayout>
  );
}
