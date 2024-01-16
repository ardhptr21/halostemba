"use client";
import { MenfessEntity } from "@halostemba/entities";
import {
  ChatBubbleIcon,
  DotsHorizontalIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ForwardedRef, forwardRef } from "react";

interface MenfessCardProps {
  redirect?: boolean;
  menfess: MenfessEntity;
}

function MenfessCard(
  { redirect, menfess }: MenfessCardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const router = useRouter();

  const handleRedirect = () => {
    if (!redirect) return;

    router.push(`/menfess/${menfess.id}`);
  };

  return (
    <Box ref={ref} width="100%">
      <Card asChild className="w-full" onClick={handleRedirect}>
        <article className={redirect ? "cursor-pointer" : ""}>
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
                  <Text size="2">
                    {menfess.anonymous
                      ? "Anonymous"
                      : "@" + menfess.author?.username}
                  </Text>
                  <Text size="2" color="gray">
                    2 menit yang lalu
                  </Text>
                </Flex>
                <DotsHorizontalIcon />
              </Flex>
              <Flex direction="column" gap="4">
                <Text size="2" color="gray" className="whitespace-pre-line">
                  {menfess.content}
                </Text>

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
                      <Text size="2">{menfess.score}</Text>
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

export default forwardRef(MenfessCard);
