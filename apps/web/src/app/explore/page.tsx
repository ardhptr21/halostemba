import { Flex } from "@radix-ui/themes";
import MainLayout from "~/components/layouts/MainLayout";
import MenfessExplorer from "~/components/organisms/menfess/MenfessExplorer";

export default function ExplorePage() {
  return (
    <MainLayout>
      <Flex direction="column" gap="4" className="w-full">
        <MenfessExplorer />
      </Flex>
    </MainLayout>
  );
}
