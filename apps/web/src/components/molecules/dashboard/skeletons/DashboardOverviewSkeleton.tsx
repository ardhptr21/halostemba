import { Box, Flex, Skeleton } from "@radix-ui/themes";

export default function DashboardOverviewSkeleton() {
  return (
    <Flex direction="row" width="100%" gap="5" justify="between">
      <Flex direction="column" className="max-w-xs w-full" gap="6">
        <Box style={{ height: "7rem" }}>
          <Skeleton className="w-full h-full" />
        </Box>
        <Box style={{ height: "7rem" }}>
          <Skeleton className="w-full h-full" />
        </Box>
        <Box style={{ height: "7rem" }}>
          <Skeleton className="w-full h-full" />
        </Box>
      </Flex>
      <Box className="w-full" style={{ height: "28rem" }}>
        <Skeleton className="w-full h-full" />
      </Box>
    </Flex>
  );
}
