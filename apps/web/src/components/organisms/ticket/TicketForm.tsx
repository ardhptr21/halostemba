"use client";

import {
  AspectRatio,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function TicketForm() {
  return (
    <Flex direction={"column"} gap={"9"} width={"100%"} className="relative">
      <div className="absolute w-[0.05rem] bg-gray-500/50 h-44 left-4 top-28 -z-50"></div>
      <Heading as="h1">Formulir Konsultasi</Heading>
      <Flex gap={"5"} width={"100%"}>
        <IconButton radius="full" asChild>
          <Text weight={"bold"}>1</Text>
        </IconButton>
        <Flex direction={"column"} width={"100%"} gap={"5"}>
          <Heading as="h2" size="4">
            Judul Permasalahan
          </Heading>
          <TextArea
            className="w-full"
            placeholder="Tuliskan judul permasalahan yang sedang kamu alami..."
            size={"2"}
          />
        </Flex>
      </Flex>
      <Flex gap={"5"} width={"100%"}>
        <IconButton radius="full" asChild color="gray">
          <Text weight={"bold"}>2</Text>
        </IconButton>
        <Flex direction={"column"} width={"100%"} gap={"5"}>
          <Heading as="h2" size="4">
            Detail Permasalahan
          </Heading>
          <AspectRatio ratio={21 / 9} asChild>
            <Flex
              justify={"center"}
              align={"center"}
              className="border-4 border-gray-700/50 border-dashed rounded-xl"
            >
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Image
                  src={"/assets/images/ticket/form.png"}
                  alt="Form image"
                  width={160}
                  height={160}
                  className="w-28 h-auto"
                />
                <Text weight={"bold"} size={"1"}>
                  Upload gambar disini!
                </Text>
                <Text size={"1"}>Seret atau klik untuk upload gambar.</Text>
              </Flex>
            </Flex>
          </AspectRatio>
          <Flex direction="column" gap="1" width="100%">
            <div className="rt-TextAreaRoot rt-r-size-2 rt-variant-surface w-full">
              <ReactTextareaAutosize
                maxRows={12}
                minRows={5}
                className="rt-TextAreaInput"
                placeholder="Ceritakan secara detail masalah atau pertanyaan yang ingin dikonsultasikan..."
                style={{ width: "100%" }}
              />
              <div className="rt-TextAreaChrome"></div>
            </div>
          </Flex>
          <Button size={"3"}>Ajukan Formulir</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
