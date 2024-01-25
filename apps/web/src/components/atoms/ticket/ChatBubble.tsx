import { MediaEntity, TicketReplyEntity } from "@halostemba/entities";
import { Card, Flex, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import { PropsWithChildren } from "react";
interface Props {
  reply: TicketReplyEntity;
  self?: boolean;
}

export default function ChatBubble({ reply, self }: Props) {
  const [media1, media2]: [MediaEntity, MediaEntity[] | undefined] = [
    reply.medias?.at(0),
    reply.medias?.slice(1),
  ];
  console.log(reply.medias?.slice(1));
  return (
    <>
      <Wrapper self={self}>
        <Flex direction="column" justify="center" gap="2">
          {media1 && (
            <div className="w-72 aspect-square overflow-hidden rounded-md relative">
              {media1.type === "IMAGE" ? (
                <Image
                  src={media1.source}
                  fill
                  sizes="100%"
                  alt={media1.source}
                  objectFit="cover"
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={media1.source}
                  className="object-cover w-full h-full"
                  controls
                />
              )}
            </div>
          )}
          <Flex
            direction="row"
            justify="between"
            align="end"
            className="w-full"
            gap="3"
          >
            <Text size="2" className="max-w-xs">
              {reply.message}
            </Text>
            <Text size="1" color="gray">
              {format(new Date(reply.createdAt), "HH:mm")}
            </Text>
          </Flex>
        </Flex>
      </Wrapper>
      {!!media2?.length && (
        <Flex direction="column" gap="2">
          {media2.map((media) => (
            <Wrapper self={self} key={media.source}>
              <div className="w-72 aspect-square overflow-hidden rounded-md relative">
                {media.type === "IMAGE" ? (
                  <Image
                    src={media.source}
                    fill
                    sizes="100%"
                    alt={media.source}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    src={media.source}
                    className="object-cover w-full h-full"
                    controls
                  />
                )}
                <Text
                  size="1"
                  color="gray"
                  className="absolute right-1 bottom-1"
                >
                  {format(new Date(reply.createdAt), "HH:mm")}
                </Text>
              </div>
            </Wrapper>
          ))}
        </Flex>
      )}
    </>
  );
}

const Wrapper = ({
  children,
  self,
}: PropsWithChildren & { self?: boolean }) => (
  <Card
    className={clsx(["max-w-xs w-max"], {
      "bg-[#3E63DD]/55": !self,
      "bg-[#3E63DD] max-w-xs": self,
    })}
    ml={self ? "auto" : "0"}
  >
    {children}
  </Card>
);
