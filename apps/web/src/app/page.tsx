import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import MainLayout from "~/components/layouts/MainLayout";
import CalloutAction from "~/components/molecules/common/CalloutAction";
import MenfessCreate from "~/components/molecules/menfess/MenfessCreate";
import ListMenfess from "~/components/organisms/menfess/ListMenfess";

export const metadata: Metadata = {
  title: "halostemba",
};

function Home() {
  return (
    <MainLayout>
      <Flex direction="column" gap="4">
        <CalloutAction />
        <MenfessCreate />
        <ListMenfess />
      </Flex>
    </MainLayout>
  );
}

export default Home;
