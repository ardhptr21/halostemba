import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

export default function CommentCard() {
  return (
    <Box>
      <Card asChild className="w-full">
        <article>
          <Flex direction="row" gap="2">
            <Box>
              <Image
                src={"/assets/images/avatar.png"}
                width={40}
                height={40}
                alt="avatar"
                className="rounded-md"
              />
            </Box>
            <Flex width="100%">
              <Flex
                width="100%"
                direction="row"
                justify="between"
                align="baseline"
              >
                <Flex direction="column" pb="4">
                  <Text size="2">Alex Goodman</Text>
                  <Text size="2" color="gray">
                    2 menit yang lalu
                  </Text>
                  <Box pt="4">
                    <Text size="2" color="gray">
                      Mantap!! keren banget emang mereka🔥
                    </Text>
                  </Box>
                </Flex>
                <DotsHorizontalIcon cursor="pointer" />
              </Flex>
            </Flex>
          </Flex>
        </article>
      </Card>
    </Box>
  );
}
