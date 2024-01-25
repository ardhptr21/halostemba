"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex, HoverCard, IconButton, Text } from "@radix-ui/themes";
import Image from "next/image";

interface PreviewMediaTickProps {
  onRemove?: (e: any) => void;
  progress?: number | null;
  preview: string;
  type: "IMAGE" | "VIDEO";
}

export default function PreviewMediaTick({
  onRemove,
  progress,
  preview,
  type,
}: PreviewMediaTickProps) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Flex
          className="h-full aspect-square relative overflow-hidden rounded-md group"
          justify="center"
          align="center"
        >
          {type === "IMAGE" ? (
            <Image
              fill
              className="group-hover:opacity-30"
              src={preview}
              alt="preview"
              objectPosition="center"
              objectFit="cover"
            />
          ) : (
            <video
              src={preview}
              className="w-full h-full object-cover object-center"
              preload="metadata"
            ></video>
          )}

          {progress ? (
            <Text as="p" size="1" className="absolute">
              {progress}%
            </Text>
          ) : (
            <IconButton
              onClick={onRemove}
              color="gray"
              style={{ cursor: "pointer" }}
              variant="surface"
              radius="full"
              className="absolute hidden group-hover:flex"
            >
              <Cross1Icon />
            </IconButton>
          )}
        </Flex>
      </HoverCard.Trigger>
      <HoverCard.Content align="center">
        <div className="w-full h-[30rem] relative aspect-[4/3]">
          {type === "IMAGE" ? (
            <Image
              fill
              className="group-hover:opacity-30"
              src={preview}
              alt="preview"
              objectPosition="center"
              objectFit="contain"
            />
          ) : (
            <video
              src={preview}
              className="w-full h-full object-contain object-center"
              preload="metadata"
              controls
              autoPlay
            ></video>
          )}
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
