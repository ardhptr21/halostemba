import { MediaEntity } from "@halostemba/entities";
import { AspectRatio, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

interface Props {
  media?: MediaEntity[];
  title: string;
  detail: string;
}

export default function PreviewTicketIssue({ media, title, detail }: Props) {
  return (
    <Card className="w-full p-5">
      <Flex direction="column" width="100%" height="100%" gap="4">
        {!!media?.length ? (
          <AspectRatio ratio={16 / 9} className="rounded-xl overflow-hidden">
            {media[0].type === "IMAGE" ? (
              <Image
                className="rounded-xl"
                src={media[0].source}
                alt={title}
                fill
                objectFit="cover"
                sizes="100%"
              />
            ) : (
              <video
                src={media[0].source}
                controls
                className="w-full h-full object-contain"
              ></video>
            )}
          </AspectRatio>
        ) : null}
        <Flex direction="column" gap="2">
          <Heading as="h1">{title}</Heading>
          <Text as="p" size="2" color="gray" className="whitespace-pre-line">
            {detail}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
