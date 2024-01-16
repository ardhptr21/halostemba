import { Flex } from "@radix-ui/themes";
import MainLayout from "~/components/layouts/MainLayout";
import CalloutAction from "~/components/molecules/common/CalloutAction";
import MenfessCard from "~/components/molecules/menfess/MenfessCard";
import MenfessCreate from "~/components/molecules/menfess/MenfessCreate";

function Home() {
  return (
    <MainLayout>
      <Flex direction="column" gap="4">
        <CalloutAction />
        <MenfessCreate />

        <MenfessCard />
        <MenfessCard />
        <MenfessCard />
        <MenfessCard />
      </Flex>
    </MainLayout>
  );
}

export default Home;
