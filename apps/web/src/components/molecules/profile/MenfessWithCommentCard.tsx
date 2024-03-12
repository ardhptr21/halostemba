import { CommentEntity, MenfessEntity } from "@halostemba/entities";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VoteMenfessButton from "~/components/atoms/menfess/VoteMenfessButton";
import ShowImageModal from "~/components/atoms/modals/ShowImageModal";
import useParseHashtags from "~/hooks/useParseHashtag";
import { preventBubbling } from "~/lib/utils";
import RenderMenfessMedia from "../menfess/RenderMenfessMedia";

interface Props {
  menfess: MenfessEntity;
  comment: CommentEntity;
}

export default function MenfessWithCommentCard({ menfess, comment }: Props) {
  const { parser } = useParseHashtags();
  const [src, setSrc] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);
  const router = useRouter();

  const handlePreview = (src: string) => {
    setSrc(src);
    setOpenImageModal(true);
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
      <Card>
        <Flex direction="column" gap="5">
          <Box width="100%">
            <article>
              <Flex direction="row" gap="2" className="min-h-full">
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
                      <Text size="2">
                        {menfess.anonymous
                          ? "Anonymous"
                          : "@" + menfess.author?.username}
                      </Text>
                      <Text size="1" color="gray">
                        2 jam yang lalu
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction="column" gap="4">
                    <div>
                      <Text
                        size="2"
                        color="gray"
                        className="whitespace-pre-line"
                      >
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
                          <Text size="2">4 Komentar</Text>
                        </Text>
                      </Flex>
                      <VoteMenfessButton menfess={menfess} />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </article>
          </Box>
          <Box>
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
                        2 jam yang lalu
                      </Text>
                      <Box pt="4">
                        <Text size="2" color="gray">
                          {parser(comment.content)}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </article>
          </Box>
        </Flex>
      </Card>
    </>
  );
}
