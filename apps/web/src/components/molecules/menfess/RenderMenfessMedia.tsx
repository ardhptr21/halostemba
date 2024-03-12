"use client";

import { MediaEntity } from "@halostemba/entities";
import { AspectRatio, Box, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { MouseEventHandler } from "react";
import AppVideo from "~/components/atoms/AppVideo";
import { preventBubbling } from "~/lib/utils";

interface Props {
  media: MediaEntity[];
  onPreview: (src: string) => any;
}

export default function RenderMenfessMedia({ media, onPreview }: Props) {
  return (
    <Box mt="3">
      <AspectRatio ratio={16 / 9}>
        {media.length === 1 && media[0].type === "VIDEO" ? (
          <AppVideo
            url={media[0].source}
            controls
            className="w-full h-full rounded-xl"
          />
        ) : (
          <Flex className="w-full h-full" gap="2">
            {media?.length > 2
              ? [media.slice(0, 2), media.slice(2, 4)].map((mp, idx) => (
                  <Flex
                    direction="column"
                    className="w-full h-full"
                    gap="2"
                    key={idx}
                  >
                    {mp.map((m) => (
                      <RenderImage
                        key={m.source}
                        src={m.source}
                        onPreview={preventBubbling(() => onPreview(m.source))}
                      />
                    ))}
                  </Flex>
                ))
              : media?.map((m) => (
                  <RenderImage
                    key={m.source}
                    src={m.source}
                    onPreview={preventBubbling(() => onPreview(m.source))}
                  />
                ))}
          </Flex>
        )}
      </AspectRatio>
    </Box>
  );
}

const RenderImage = ({
  src,
  onPreview,
}: {
  src: string;
  onPreview?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden group cursor-pointer"
      onClick={onPreview}
    >
      <div className="absolute inset-0 bg-opacity-50 z-10 group-hover:bg-indigo-500/15"></div>
      <Image
        fill
        sizes="100%"
        src={src}
        alt={src}
        className="object-cover object-center"
      />
    </div>
  );
};
