"use client";

import { Flex } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetListUserMenfessInfiniteApi } from "~/apis/profile/get-user-menfess-api";
import MenfessCard from "~/components/molecules/menfess/MenfessCard";
import MenfessCardSkeleton from "~/components/molecules/menfess/skeletons/MenfessCardSkeleton";

interface Props {
  username: string;
  token?: string;
}
export default function UserMenfessList({ username, token }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
  });

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetListUserMenfessInfiniteApi(username, {
      token,
    });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Flex direction="column" gap="4" className="mb-20 md:mb-20 xl:mb-0">
      {data?.pages.map((page) =>
        page.data.map((m) => (
          <MenfessCard key={m.id} redirect={true} menfess={m} />
        )),
      )}

      {isFetching || isFetchingNextPage
        ? Array.from({ length: 4 }).map((_, i) => (
            <MenfessCardSkeleton key={i} />
          ))
        : null}

      <div ref={ref} />
    </Flex>
  );
}
