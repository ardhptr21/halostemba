import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Card, Flex, Text } from "@radix-ui/themes";
import SidebarContainer from "./SidebarContainer";

export default function TrendingSide() {
  return (
    <SidebarContainer>
      <Card className="p-4 w-full">
        <Flex direction="column" gap="4">
          <Text size="5" weight="bold">
            Trending 🔥
          </Text>
          <Flex direction="column" gap="3">
            <Flex direction="row" justify="between">
              <Flex direction="column" gap="1">
                <Text size="3">#SEVORIA</Text>
                <Text size="2">500 Post</Text>
              </Flex>
              <DotsHorizontalIcon />
            </Flex>
            <Flex direction="row" justify="between">
              <Flex direction="column" gap="1">
                <Text size="3">#SpartaWin</Text>
                <Text size="2">400 Post</Text>
              </Flex>
              <DotsHorizontalIcon />
            </Flex>
            <Flex direction="row" justify="between">
              <Flex direction="column" gap="1">
                <Text size="3">#HARIPRAMUKA</Text>
                <Text size="2">350 Post</Text>
              </Flex>
              <DotsHorizontalIcon />
            </Flex>
            <Flex direction="row" justify="between">
              <Flex direction="column" gap="1">
                <Text size="3">#PSISGoesToSTEMBA</Text>
                <Text size="2">200 Post</Text>
              </Flex>
              <DotsHorizontalIcon />
            </Flex>
            <Flex direction="row" justify="between">
              <Flex direction="column" gap="1">
                <Text size="3">#LKSTEMBA</Text>
                <Text size="2">100 Post</Text>
              </Flex>
              <DotsHorizontalIcon />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </SidebarContainer>
  );
}
