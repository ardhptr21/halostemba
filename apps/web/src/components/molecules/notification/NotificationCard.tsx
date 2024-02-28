import { NotificationEntity } from "@halostemba/entities";
import {
  ChatBubbleIcon,
  IdCardIcon,
  InfoCircledIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Card, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NotificationCardProps {
  notification: NotificationEntity;
}

const typeBadge = {
  INFO: {
    bg: "bg-[#C2F3FF]",
    text: "text-[#2D87B4]",
  },
  SUCCESS: {
    bg: "bg-[#B1F1CB]",
    text: "text-[#2C8C5E]",
  },
  WARNING: {
    bg: "bg-[#FFE7B3]",
    text: "text-[#A9762A]",
  },
  DANGER: {
    bg: "bg-[#FFD1D9]",
    text: "text-[#D21E24]",
  },
};

export default function NotificationCard({
  notification: {
    title,
    message,
    createdAt,
    type,
    identifier,
    image,
    url,
    read,
  },
}: NotificationCardProps) {
  return (
    <Link href={url || "/"}>
      <Card
        className={clsx(
          [
            "w-full cursor-pointer  hover:bg-indigo-500/10  duration-150 ease-in-out ",
          ],
          {
            "bg-[#3f64dd25]": !read,
            "bg-[#18191c]": read,
          },
        )}
      >
        <Flex justify="between" align="start" gap="3">
          <Flex align="start" gap="2">
            <IconButton variant="solid" className={typeBadge[type].bg}>
              <NotificationIcon
                identifier={identifier || "VOTE"}
                textColour={typeBadge[type].text}
              />
            </IconButton>
            <Flex direction="column" gap="2" justify="start">
              <Heading as="h3" size="2">
                {title}
              </Heading>
              {image && (
                <div className="relative w-64 h-44 rounded-xl overflow-hidden flex items-start justify-start">
                  <Image
                    src={image}
                    fill
                    alt="preview"
                    objectPosition="center"
                    objectFit="cover"
                  />
                </div>
              )}
              <Text size="1" className="whitespace-pre-line">
                {message || "No message"}
              </Text>
            </Flex>
          </Flex>
          <Text size="1">
            {formatDistanceToNowStrict(new Date(createdAt), {
              locale: id,
              addSuffix: true,
            })}
          </Text>
        </Flex>
      </Card>
    </Link>
  );
}

const NotificationIcon = ({
  identifier,
  textColour,
}: {
  identifier: "COMMENT" | "VOTE" | "TICKET" | "VERIFICATION" | "WARNING";
  textColour?: string;
}) => {
  const classes = `${textColour} cursor-pointer`;

  const iconType = {
    COMMENT: <ChatBubbleIcon className={classes} />,
    VOTE: <InfoCircledIcon className={classes} />,
    TICKET: <IdCardIcon className={classes} />,
    VERIFICATION: <RocketIcon className={classes} />,
    WARNING: <InfoCircledIcon className={classes} />,
  };

  return iconType[identifier];
};
