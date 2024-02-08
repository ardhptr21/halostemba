"use client";

import { Card, Flex, Text } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useGetTrendingHashtagApi } from "~/apis/menfess/get-trending-hashtag-api";

interface Props {
  className?: string;
}

export default function TrendingHashtagCard({ className }: Props) {
  const { data } = useGetTrendingHashtagApi();

  return (
    <Card className={clsx(["p-4 w-full hidden md:flex", className])}>
      <Flex direction="column" gap="4">
        <Text size="5" weight="bold">
          Trending Hashtag 🔥
        </Text>
        {!data?.length ? (
          <Flex>
            <Text>Tidak ada hashtag populer</Text>
          </Flex>
        ) : (
          <>
            <Flex direction="column" gap="3">
              {data?.map((data) => (
                <Flex direction="row" justify="between" key={data.name} asChild>
                  <Link
                    className="hover:bg-[#3E63DD] hover:bg-opacity-20 py-1 px-3 rounded-md"
                    href={`/explore?q=${encodeURIComponent(data.name)}`}
                  >
                    <Flex direction="column" gap="1">
                      <Text size="3">{`#${data.name}`}</Text>
                      <Text size="2">{data.score} Post</Text>
                    </Flex>
                  </Link>
                </Flex>
              ))}
            </Flex>
          </>
        )}
      </Flex>
    </Card>
  );
}
