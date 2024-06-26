"use client";
import { MenfessEntity } from "@halostemba/entities";
import {
  ChatBubbleIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Popover,
  Text,
} from "@radix-ui/themes";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForwardedRef, MouseEvent, forwardRef, useState } from "react";
import VoteMenfessButton from "~/components/atoms/menfess/VoteMenfessButton";
import DeleteMenfessModal from "~/components/atoms/modals/DeleteMenfessModal";
import ShowImageModal from "~/components/atoms/modals/ShowImageModal";
import useParseHashtag from "~/hooks/useParseHashtag";
import { preventBubbling } from "~/lib/utils";
import RenderMenfessMedia from "./RenderMenfessMedia";

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
  const router = useRouter();

  const handlePreview = (src: string) => {
    setSrc(src);
    setOpenImageModal(true);
  };

  const handleClickRedirect = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLAnchorElement) return;
    router.push(`/menfess/${menfess.id}`);
  };

  return (
    <>
      {menfess.medias.length > 0 ? (
        <ShowImageModal
          src={src}
          open={openImageModal}
          onOpenChange={setOpenImageModal}
        />
      ) : null}
      <Box
        ref={ref}
        width="100%"
        className="cursor-pointer"
        onClick={handleClickRedirect}
      >
        <Card asChild className="w-full">
          <article>
            <Flex direction="row" gap="2">
              <Avatar
                src={
                  menfess.author?.avatar && !menfess.anonymous
                    ? menfess.author.avatar
                    : undefined
                }
                fallback={
                  menfess.anonymous ? "?" : menfess.author?.name.at(0) || ""
                }
                color={menfess.anonymous ? "red" : "indigo"}
                alt="avatar"
                onClick={preventBubbling(
                  () =>
                    !menfess.anonymous &&
                    router.push(`/${menfess.author?.username}`),
                )}
              />

              <Flex width="100%" direction="column">
                <Flex
                  width="100%"
                  direction="row"
                  justify="between"
                  align="baseline"
                >
                  <Flex direction="column" pb="4">
                    <>
                      {menfess.anonymous ? (
                        <Text size="2">Anonymous</Text>
                      ) : (
                        <Link href={`/${menfess.author?.username}`}>
                          {"@" + menfess.author?.username}
                        </Link>
                      )}
                    </>
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
                  <div className={redirect ? "cursor-pointer" : ""}>
                    <Text size="2" color="gray" className="whitespace-pre-line">
                      {parser(menfess.content)}
                    </Text>
                    {menfess.medias.length > 0 ? (
                      <RenderMenfessMedia
                        media={menfess.medias}
                        onPreview={handlePreview}
                      />
                    ) : null}
                  </div>
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
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <>
      <DeleteMenfessModal
        menfessId={menfessId}
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
      />
      <Popover.Root open={openPopover} onOpenChange={setOpenPopover}>
        <Popover.Trigger>
          <Button
            variant="ghost"
            style={{ cursor: "pointer" }}
            onClick={preventBubbling(() => setOpenPopover(!openPopover))}
          >
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
              <Text>Hapus</Text>
            </Text>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default forwardRef(MenfessCard);
