import { CommentEntity } from "@halostemba/entities";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Popover, Text } from "@radix-ui/themes";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import DeleteCommentModal from "~/components/atoms/modals/DeleteCommentModal";

interface CommentCardProps {
  comment: CommentEntity;
  menfessId: string;
}

export default function CommentCard({ comment, menfessId }: CommentCardProps) {
  const { data: session } = useSession();
  return (
    <Box>
      <Card asChild className="w-full">
        <article>
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
            <Flex width="100%">
              <Flex
                width="100%"
                direction="row"
                justify="between"
                align="baseline"
              >
                <Flex direction="column" pb="4">
                  <Text size="2">@{comment.author.username}</Text>
                  <Text size="1" color="gray">
                    {formatDistanceToNowStrict(new Date(comment.createdAt), {
                      locale: id,
                      addSuffix: true,
                    })}
                  </Text>
                  <Box pt="4">
                    <Text size="2" color="gray">
                      {comment.content}
                    </Text>
                  </Box>
                </Flex>
                {session?.user.username === comment.author.username && (
                  <CommentCardPopOver
                    commentId={comment.id}
                    menfessId={menfessId}
                  />
                )}
              </Flex>
            </Flex>
          </Flex>
        </article>
      </Card>
    </Box>
  );
}

interface CommentCardPopOverProps {
  commentId: string;
  menfessId: string;
}

const CommentCardPopOver = ({
  commentId,
  menfessId,
}: CommentCardPopOverProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <DeleteCommentModal
        menfessId={menfessId}
        commentId={commentId}
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
      />
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="ghost" style={{ cursor: "pointer" }}>
            <DotsHorizontalIcon />
          </Button>
        </Popover.Trigger>
        <Popover.Content align="end" size={"1"} style={{ width: 105 }}>
          <Flex
            align={"center"}
            asChild
            style={{ cursor: "pointer" }}
            onClick={() => setOpenDeleteModal(true)}
          >
            <Text as="p" color="red">
              <TrashIcon width={20} height={20} />
              <Text>Delete</Text>
            </Text>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};
