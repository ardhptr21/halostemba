"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FaceIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Switch, Text, Tooltip } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { KeyboardEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useDebouncedCallback } from "use-debounce";
import { useCreateMenfess } from "~/apis/menfess/create-menfess-api";
import HashtagsAutoComplete from "~/components/atoms/menfess/HashtagsAutoComplete";
import MustBeLoginModal from "~/components/atoms/modals/auth/MustBeLoginModal";
import MustBeVerifiedModal from "~/components/atoms/modals/auth/MustBeVerifiedModal";
import { mediaParser } from "~/lib/media";
import { getWordByPosition } from "~/lib/utils";
import {
  useMediaStoreMenfess,
  usePreviewMediaStoreMenfess,
} from "~/store/media/menfess-media-store";
import {
  CreateMenfessValidator,
  CreateMenfessValidatorType,
} from "~/validators/menfess/create-menfess-validator";
import PreviewMediaMenfess from "./PreviewMediaMenfess";
import UploadMediaMenfess from "./UploadMediaMenfess";

interface Props {
  avatar?: string | null;
}

export default function MenfessCreate({ avatar }: Props) {
  const { data: session } = useSession();
  const [showMustVerified, setShowMustVerified] = useState(false);
  const [showMustLogin, setShowMustLogin] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [hashtagTyping, setHashtagTyping] = useState<string>("");
  const [anonymous, setAnonymous] = useState(true);

  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [media, cleanMedia] = useMediaStoreMenfess((state) => [
    state.media,
    state.cleanMedia,
  ]);
  const setPreviewMedia = usePreviewMediaStoreMenfess(
    (state) => state.setPreviewMedia,
  );

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateMenfessValidatorType>({
    defaultValues: {
      content: "",
      anonymous: true,
    },
    mode: "onChange",
    resolver: zodResolver(CreateMenfessValidator),
  });

  const { mutate: createMenfessHandler, isPending } = useCreateMenfess({
    onError: (error) => {
      console.log(error);
      const message =
        error.response?.data.error || "Gagal membuat menfess, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: async (data) => {
      queryClient.removeQueries({ queryKey: ["infinite-menfess"] });
      router.refresh();
      reset();
      cleanMedia();
      setPreviewMedia(null);
      const message = data.message || "Berhasil membuat menfess.";
      toast(message, { variant: "success" });
    },
  });

  const handleClick = () => {
    if (!session) return setShowMustLogin(true);
    if (session?.user.role === "GUEST") return setShowMustVerified(true);
  };

  const handleCreate = () => {
    handleSubmit((data) => {
      createMenfessHandler({
        ...data,
        media: mediaParser(media),
        token: session?.token as string,
      });
    })();
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const rule = /(?:^|(?<=\s))([#＃][^\s#]+)(?=\s|$)/g;
    const currentValue = e.currentTarget.value;
    const currentPosition = e.currentTarget.selectionStart;
    const word = getWordByPosition(currentValue, currentPosition);

    if (rule.test(word)) {
      changeHashtag(word, true);
    } else {
      changeHashtag("", false);
    }
  };

  const changeHashtag = useDebouncedCallback(
    (hashtag: string, show: boolean) => {
      setHashtagTyping(hashtag);
      setShowAutoComplete(show);
    },
    500,
  );

  const handleCompleteHashtag = (hashtag: string) => {
    const value = textareaRef.current?.value || "";
    const pos = textareaRef.current?.selectionStart || 0;
    const word = getWordByPosition(value!, pos!);

    const char = word.indexOf(value.charAt(pos - 1));
    const start = pos - char - 1;
    const end = start + word.length;

    const final =
      value.substring(0, start) + `#${hashtag}` + value.substring(end) + " ";
    const carretPos = end + (hashtag.length - word.length) + 2;

    setValue("content", final);
    setShowAutoComplete(false);
    textareaRef.current?.focus();

    textareaRef.current?.setSelectionRange(carretPos, carretPos);
  };

  return (
    <div className="relative">
      <MustBeVerifiedModal
        open={showMustVerified}
        onOpenChange={setShowMustVerified}
      />
      <MustBeLoginModal open={showMustLogin} onOpenChange={setShowMustLogin} />
      <Box
        p={"3"}
        className="rt-reset rt-Card w-full rt-r-size-1 rt-variant-surface"
        onClick={handleClick}
      >
        <Flex
          direction="column"
          style={{
            pointerEvents: !session ? "none" : "initial",
          }}
        >
          <Flex direction="row" gap="2">
            <Box>
              <Image
                src={avatar || "/assets/images/avatar.png"}
                width={45}
                height={45}
                alt="avatar"
                className="rounded-md"
              />
            </Box>

            <Flex direction="column" gap="1" width="100%" className="relative">
              <div className="rt-TextAreaRoot rt-r-size-2 rt-variant-surface w-full ">
                <TextareaAutosize
                  disabled={isPending}
                  maxRows={12}
                  className="rt-TextAreaInput"
                  placeholder="Apa yang sedang terjadi !?"
                  style={{ width: "100%" }}
                  onKeyUp={handleKeyUp}
                  {...register("content")}
                  ref={(el) => {
                    textareaRef.current = el;
                    register("content").ref(el);
                  }}
                />
                <div className="rt-TextAreaChrome"></div>
              </div>
              <HashtagsAutoComplete
                onSelect={handleCompleteHashtag}
                hashtag={hashtagTyping}
                open={showAutoComplete}
              />
              <Text as="p" size="1" color="red">
                {errors.content?.message}
              </Text>
              <PreviewMediaMenfess />
            </Flex>
          </Flex>
          <Flex direction="row" pt="3" pl="8" justify="between">
            <Flex direction="row" gap="2" className="mt-2" align="center">
              <UploadMediaMenfess />
              <FaceIcon
                width={15}
                height={"100%"}
                style={{ color: "#99A2FF" }}
              />
              <Tooltip
                content="Jika diaktifkan, menfess akan dikirim tanpa identitas."
                delayDuration={150}
              >
                <Text
                  as="label"
                  className="text-[10px] xl:text-sm"
                  color="indigo"
                >
                  <Flex gap="2">
                    <Switch
                      size="1"
                      {...register("anonymous")}
                      checked={anonymous}
                      onCheckedChange={(value) => {
                        setAnonymous(value);
                        setValue("anonymous", value);
                      }}
                    />{" "}
                    Kirim sebagai anonim?
                  </Flex>
                </Text>
              </Tooltip>
            </Flex>
            <Button
              size="2"
              onClick={handleCreate}
              disabled={isPending}
              style={{
                cursor: "pointer",
              }}
            >
              Posting
            </Button>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}
