"use client";

import { Box, Flex, TabsList, TabsRoot, TabsTrigger } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetListMenfessInfiniteApi } from "~/apis/menfess/get-list-menfess-api";
import MenfessCard from "~/components/molecules/menfess/MenfessCard";
import MenfessSearch from "~/components/molecules/menfess/MenfessSearch";
import MenfessCardSkeleton from "~/components/molecules/menfess/skeletons/MenfessCardSkeleton";

interface Props {
  session?: Session | null;
}

export default function MenfessExplorer({ session }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
  });
  const params = useSearchParams();

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetListMenfessInfiniteApi(
      session?.token as string,
      {
        search: params.get("q") || "",
      },
      {
        enabled: !!params.get("q"),
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <MenfessSearch />
      {!!data?.pages.length ? (
        <TabsRoot>
          <TabsList size="2" className="justify-center">
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
          </TabsList>

          <Box py="5">
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
          </Box>
        </TabsRoot>
      ) : null}
    </>
  );
}
