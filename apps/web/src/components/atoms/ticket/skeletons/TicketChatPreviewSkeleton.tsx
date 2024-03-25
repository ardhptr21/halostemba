import { Box, Flex, Skeleton } from "@radix-ui/themes";

export default function TicketChatPreviewSkeleton() {
  return (
    <Box width="100%" px="3" pt="2">
      <Box
        className="border-b-gray-500/70 group-hover:border-b-transparent"
        pb="3"
      >
        <Flex justify={"between"} width={"100%"} gap={"3"}>
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-10 h-4" />
        </Flex>
        <Skeleton className="w-full h-3 mt-2" />
      </Box>
    </Box>
  );
}
