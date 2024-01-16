import {
  ChatBubbleIcon,
  DotsHorizontalIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function MenfessCard() {
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
            <Flex width="100%" direction="column">
              <Flex
                width="100%"
                direction="row"
                justify="between"
                align="baseline"
              >
                <Flex direction="column" pb="4">
                  <Text size="2">John Doe</Text>
                  <Text size="2" color="gray">
                    2 menit yang lalu
                  </Text>
                </Flex>
                <DotsHorizontalIcon />
              </Flex>
              <Flex direction="column" gap="4">
                <Text size="2" color="gray">
                  Warning Allert!! Tannssss gilakkk keren banget aksi dari anak
                  argapeta tadi waktu upacara. Mereka rapling dari tower yang
                  tinggi buangettt itu lohh 🤯🔥🔥
                </Text>
                <Flex align="center" justify="center">
                  <Image
                    src={"/assets/images/menfess.png"}
                    width={700}
                    height={500}
                    alt="avatar"
                    className="rounded-md"
                  />
                </Flex>

                <Flex align="center" gap="3">
                  <Flex align="center" asChild gap="2">
                    <Text as="p" color="gray">
                      <ChatBubbleIcon cursor="pointer" />
                      <Text size="2">4 Replies</Text>
                    </Text>
                  </Flex>
                  <Flex align="center" gap="1" asChild>
                    <Text as="p" color="gray">
                      <TriangleUpIcon className="text-slate-400" />
                      <Text size="2">1.5 K</Text>
                      <TriangleDownIcon />
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </article>
      </Card>
    </Box>
  );
}
