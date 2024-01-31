"use client";

import { Flex } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetListUserCommentInfiniteApi } from "~/apis/profile/get-user-comment-api";
import MenfessWithCommentCard from "~/components/molecules/profile/MenfessWithCommentCard";

interface Props {
  username: string;
  token?: string;
}
export default function UserCommentList({ username, token }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
  });

  const { data, fetchNextPage, hasNextPage } = useGetListUserCommentInfiniteApi(
    username,
    {
      token,
    },
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Flex width="100%" direction="column" gap="4">
      {data?.pages.map((page) =>
        page.data.map((m) => (
          <MenfessWithCommentCard
            menfess={m.menfess}
            comment={m.comment}
            key={m.comment.id}
          />
        )),
      )}
      <div ref={ref}></div>
    </Flex>
  );
}
