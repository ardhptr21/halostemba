import {
  ChatBubbleIcon,
  IdCardIcon,
  InfoCircledIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Card, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import React from "react";

interface NotificationCardProps {
  type: "INFO" | "SUCCESS" | "WARNING" | "DANGER";
  identifier?:
    | "COMMENT"
    | "VOTE"
    | "TICKET"
    | "VERIFICATION"
    | "WARNING"
    | null;
  title: string;
  message: string;
  createdAt: string;
  image?: string;
}

const typeBadge = {
  INFO: {
    bg: "#C2F3FF",
    text: "#2D87B4",
  },
  SUCCESS: {
    bg: "#B1F1CB",
    text: "#2C8C5E",
  },
  WARNING: {
    bg: "#FFE7B3",
    text: "#A9762A",
  },
  DANGER: {
    bg: "#FFD1D9",
    text: "#D21E24",
  },
};

export default function NotificationCard({
  image,
  identifier,
  type,
  message,
  title,
  createdAt,
}: NotificationCardProps) {
  return (
    <Card
      className="w-full cursor-pointer hover:bg-indigo-500/10  duration-150 ease-in-out 
    "
    >
      <Flex justify="between" align="start">
        <Flex align="start" gap="2">
          <IconButton variant="solid" className={`bg-[${typeBadge[type].bg}]`}>
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
              <div className="relative w-full h-44 rounded-xl overflow-hidden flex items-start justify-start">
                <Image
                  src={image}
                  fill
                  alt="preview"
                  objectPosition="center"
                  objectFit="cover"
                />
              </div>
            )}
            <Text size="1">{message}</Text>
          </Flex>
        </Flex>
        <Text size="1">
          {" "}
          {formatDistanceToNowStrict(new Date(createdAt), {
            locale: id,
            addSuffix: true,
          })}
        </Text>
      </Flex>
    </Card>
  );
}

const NotificationIcon = ({
  identifier,
  textColour,
}: {
  identifier: "COMMENT" | "VOTE" | "TICKET" | "VERIFICATION" | "WARNING";
  textColour?: string;
}) => {
  const classes = `text-[${textColour}] cursor-pointer`;

  const iconType = {
    COMMENT: <ChatBubbleIcon className={classes} />,
    VOTE: <InfoCircledIcon className={classes} />,
    TICKET: <IdCardIcon className={classes} />,
    VERIFICATION: <RocketIcon className={classes} />,
    WARNING: <InfoCircledIcon className={classes} />,
  };

  return iconType[identifier];
};
