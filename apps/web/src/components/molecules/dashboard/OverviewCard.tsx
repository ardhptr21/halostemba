import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  color: string;
}

export default function OverviewCard({
  title,
  value,
  icon: Icon,
  color,
}: OverviewCardProps) {
  return (
    <Card>
      <Flex direction="row" align="center" justify="between" className="gap-32">
        <Flex direction="column" gap="4">
          <Text color="gray">{title}</Text>
          <Text size="8" weight="bold">
            {value}
          </Text>
        </Flex>
        <IconButton asChild size="4" color={color as any} variant="surface">
          <Box p="2">
            <Icon width={40} height={40} />
          </Box>
        </IconButton>
      </Flex>
    </Card>
  );
}
