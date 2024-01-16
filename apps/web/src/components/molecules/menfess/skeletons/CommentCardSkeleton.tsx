"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Skeleton } from "@radix-ui/themes";

export default function CommentCardSkeleton() {
  return (
    <Box>
      <Card asChild className="w-full">
        <article>
          <Flex direction="row" gap="2">
            <Box style={{ width: 40, height: 40 }} className="aspect-square">
              <Skeleton className="w-full h-full" color="red" />
            </Box>
            <Flex width="100%" direction="column">
              <Flex
                width="100%"
                direction="row"
                justify="between"
                align="baseline"
              >
                <Flex direction="column" gap="1" pb="4">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-32 h-3" />
                </Flex>
                <DotsHorizontalIcon />
              </Flex>
              <Flex direction="column" gap="4">
                <Flex direction="column" gap="1">
                  <Skeleton className="w-1/2 h-3" />
                  <Skeleton className="w-3/4 h-3" />
                  <Skeleton className="w-1/4 h-3" />
                  <Skeleton className="w-5/6 h-3" />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </article>
      </Card>
    </Box>
  );
}
