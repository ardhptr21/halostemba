"use client";

import { Flex } from "@radix-ui/themes";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetListMenfessInfiniteApi } from "~/apis/menfess/get-list-menfess-api";
import MenfessCard from "~/components/molecules/menfess/MenfessCard";
import MenfessCardSkeleton from "~/components/molecules/menfess/skeletons/MenfessCardSkeleton";

export default function ListMenfess() {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
  });

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetListMenfessInfiniteApi();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Flex direction="column" gap="4">
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
