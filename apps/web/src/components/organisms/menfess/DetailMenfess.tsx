"use client";
import { Flex } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useDetailMenfessApi } from "~/apis/menfess/get-detail-menfess-api";
import MenfessCard from "~/components/molecules/menfess/MenfessCard";
import CommentCard from "~/components/molecules/menfess/comment/CommentCard";
import CommentCreate from "~/components/molecules/menfess/comment/CommentCreate";
import CommentCardSkeleton from "~/components/molecules/menfess/skeletons/CommentCardSkeleton";
import MenfessCardSkeleton from "~/components/molecules/menfess/skeletons/MenfessCardSkeleton";

interface Props {
  id: string;
  session?: Session | null;
}

export default function DetailMenfess({ id, session }: Props) {
  const { data, isPending } = useDetailMenfessApi(id, session?.token);

  return (
    <Flex width="100%" direction="column" gap="4">
      {!isPending ? (
        <MenfessCard menfess={data!} redirect={false} />
      ) : (
        <MenfessCardSkeleton />
      )}
      <CommentCreate menfessId={id} />
      {isPending
        ? Array.from({ length: 3 }).map((_, i) => (
            <CommentCardSkeleton key={i} />
          ))
        : data?.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} menfessId={id} />
          ))}
    </Flex>
  );
}
