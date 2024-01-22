"use client";
import { MenfessEntity } from "@halostemba/entities";
import {
  ChatBubbleIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Popover, Text } from "@radix-ui/themes";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ForwardedRef, forwardRef, useState } from "react";
import VoteMenfessButton from "~/components/atoms/menfess/VoteMenfessButton";
import DeleteMenfessModal from "~/components/atoms/modals/DeleteMenfessModal";
import { preventBubbling } from "~/lib/utils";
import RenderMenfessMedia from "./RenderMenfessMedia";
import ShowImageModal from "~/components/atoms/modals/ShowImageModal";
import useParseHashtag from "~/hooks/useParseHashtag";

interface MenfessCardProps {
  redirect?: boolean;
  menfess: MenfessEntity;
}

function MenfessCard(
  { redirect, menfess }: MenfessCardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { data: session } = useSession();
  const [src, setSrc] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);
  const { parser } = useParseHashtag();

  const handlePreview = (src: string) => {
    setSrc(src);
    setOpenImageModal(true);
  };

  const Wrapper = redirect ? Link : "div";
  return (
    <>
      {menfess.medias.length > 0 ? (
        <ShowImageModal
          src={src}
          open={openImageModal}
          onOpenChange={setOpenImageModal}
        />
      ) : null}
      <Box ref={ref} width="100%">
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

              <Flex width="100%" direction="column">
                <Flex
                  width="100%"
                  direction="row"
                  justify="between"
                  align="baseline"
                >
                  <Flex direction="column" pb="4">
                    <Text size="2">
                      {menfess.anonymous
                        ? "Anonymous"
                        : "@" + menfess.author?.username}
                    </Text>
                    <Text size="1" color="gray">
                      {formatDistanceToNowStrict(new Date(menfess.createdAt), {
                        locale: id,
                        addSuffix: true,
                      })}
                    </Text>
                  </Flex>

                  {session?.user.id === menfess.authorId && (
                    <MenfessCardPopOver menfessId={menfess.id} />
                  )}
                </Flex>
                <Flex direction="column" gap="4">
                  <Wrapper
                    href={`/menfess/${menfess.id}`}
                    className={redirect ? "cursor-pointer" : ""}
                  >
                    <Text size="2" color="gray" className="whitespace-pre-line">
                      {parser(menfess.content)}
                    </Text>
                    {menfess.medias.length > 0 ? (
                      <RenderMenfessMedia
                        media={menfess.medias}
                        onPreview={handlePreview}
                      />
                    ) : null}
                  </Wrapper>
                  <Flex align="center" gap="3">
                    <Flex align="center" asChild gap="2">
                      <Text as="p" color="gray">
                        <ChatBubbleIcon cursor="pointer" />
                        <Text size="2">{menfess._count.comments} Komentar</Text>
                      </Text>
                    </Flex>
                    <VoteMenfessButton menfess={menfess} />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </article>
        </Card>
      </Box>
    </>
  );
}

interface MenfessCardPopOverProps {
  menfessId: string;
}

const MenfessCardPopOver = ({ menfessId }: MenfessCardPopOverProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <DeleteMenfessModal
        menfessId={menfessId}
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
            onClick={preventBubbling(() => setOpenDeleteModal(true))}
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

export default forwardRef(MenfessCard);
