import { Flex } from "@radix-ui/themes";
import MainLayout from "~/components/layouts/MainLayout";
import MenfessCard from "~/components/molecules/menfess/MenfessCard";
import CommentCard from "~/components/molecules/menfess/comment/CommentCard";
import CommentCreate from "~/components/molecules/menfess/comment/CommentCreate";

export default function page() {
  return (
    <MainLayout>
      <Flex direction="column" gap="4">
        <MenfessCard pageDetail />
        <CommentCreate />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </Flex>
    </MainLayout>
  );
}
