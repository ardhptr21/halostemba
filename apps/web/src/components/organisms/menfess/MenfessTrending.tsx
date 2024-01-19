import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetListTrendingMenfessInfiniteApi } from "~/apis/menfess/get-list-trending-menfess";
import MenfessCard from "~/components/molecules/menfess/MenfessCard";
import MenfessCardSkeleton from "~/components/molecules/menfess/skeletons/MenfessCardSkeleton";

interface Props {
  session?: Session | null;
}

export default function MenfessTrending({ session }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
  });
  const params = useSearchParams();

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetListTrendingMenfessInfiniteApi(
      session?.token as string,
      {
        search: params.get("q") || "",
      },
      {
        enabled: !params.get("q"),
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {!!data?.pages.length && !!data.pages[0].data.length ? (
        <>
          <Heading as="h2" className="py-4">
            Trending Menfess 🔥
          </Heading>
          <Box>
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
        </>
      ) : (
        <Flex direction={"column"} align={"center"}>
          <Flex justify="center">
            <Image
              src="/assets/images/menfess/no-trending.png"
              alt="account not verified"
              className="w-60"
              width={200}
              height={200}
            />
          </Flex>
          <Heading as="h3">Tidak ada trending</Heading>
          <Text
            as="p"
            color="gray"
            align={"center"}
            className="max-w-sm mx-auto"
            size={"2"}
          >
            Kembali beberapa saat lagi untuk melihat ada sesuatu yang baru
          </Text>
        </Flex>
      )}
    </>
  );
}
