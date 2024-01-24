import { Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

export default function PreviewTicketIssue() {
  return (
    <Card className="w-full min-h-28 ">
      <Flex
        justify={"center"}
        align={"center"}
        width={"100%"}
        height={"100%"}
        gap={"4"}
      >
        <Image
          src={"/assets/images/ticket/chat.png"}
          alt="Chat Image"
          width={"160"}
          height={"160"}
        />
        <Flex direction={"column"}>
          <Text weight={"medium"}>Pendaftaran KIP-K</Text>
          <Text size={"1"} color="gray">
            Izin bertanya pak/bu terkait KIP Kuliah ini. Apakah peserta yang
            ingin mendaftar sebagai...
            <span className="text-indigo-400 cursor-pointer">Show more</span>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
