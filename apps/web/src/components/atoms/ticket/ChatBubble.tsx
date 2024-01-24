import { Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

interface Props {
  self?: boolean;
  img?: string;
}

export default function ChatBubble({ self, img }: Props) {
  return (
    <Card
      className={!self ? "bg-[#3E63DD]/55 max-w-xs" : "bg-[#3E63DD] max-w-xs "}
      ml={self ? "auto" : "0"}
    >
      <Flex direction={"column"} justify={"center"} gap={"1"}>
        {img && (
          <Image
            src={img}
            alt="Chat bubble"
            className="min-w-[18.3rem] rounded-md"
            width={"246"}
            height={"145"}
            layout="raw"
          />
        )}
        <Flex direction={"row"} align={"end"}>
          <Text size={"2"} className="max-w-xs">
            Untuk masalah itu, kamu bisa melihat informasi dibawah di atas
          </Text>
          <Text size={"1"} color="gray">
            10:45
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
