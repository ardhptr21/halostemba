"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import clsx from "clsx";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useCreateTicket } from "~/apis/ticket/create-ticket-api";
import UploadMediaTicket from "~/components/molecules/ticket/UploadMediaTicket";
import {
  useMediaStoreTicket,
  usePreviewMediaStoreTicket,
} from "~/store/media/ticket-media-store";
import {
  CreateTicketValidator,
  CreateTicketValidatorType,
} from "~/validators/ticket/create-ticket-validator";

interface Props {
  session: Session;
}

export default function TicketForm({ session }: Props) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar: toast } = useSnackbar();
  const { media, cleanMedia } = useMediaStoreTicket();
  const setPreviewMedia = usePreviewMediaStoreTicket((s) => s.setPreviewMedia);

  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateTicketValidatorType>({
    defaultValues: {
      title: "",
      detail: "",
    },
    mode: "onChange",
    resolver: zodResolver(CreateTicketValidator),
  });

  const { mutate: createTicketHandler, isPending } = useCreateTicket({
    onError: (error) => {
      toast(error.message, { variant: "error" });
    },
    onSuccess: (data) => {
      reset();
      cleanMedia();
      setPreviewMedia([]);
      toast("Ticket berhasil dibuat.", { variant: "success" });
      router.push(`/ticket/${data.id}?status=WAITING`);
    },
  });

  watch((data, {}) => {
    if (typeof data.title === "string") {
      if (data.title.length >= 5) return setIsActive(true);
      setIsActive(false);
    }
  });

  const handleCreate = handleSubmit((data) => {
    createTicketHandler({
      token: session.token,
      ...data,
      media: Object.values(media).map((m) => ({
        source: m.url!,
        type: m.type!,
      })),
    });
  });

  return (
    <>
      <Flex direction="column" gap="6" width="100%" className="relative">
        <Flex gap="4">
          <ArrowLeftIcon width={30} height={30} />
          <Heading as="h1" size="5">
            Formulir Konsultasi
          </Heading>
        </Flex>
        <Flex direction="column" gap="6">
          <div
            className={clsx([
              "hidden xl:block absolute left-4 top-20 -z-50 transition-colors duration-150 ease-in-out",
              {
                "bg-gray-200/50 w-[0.1rem] h-44": isActive,
                "bg-gray-500/50 w-[0.05rem] h-48": !isActive,
              },
            ])}
          ></div>

          <Flex direction="column" gap="5" width="100%">
            <Flex direction="row" gap="4" align="center">
              <IconButton radius="full" asChild>
                <Text weight="bold">1</Text>
              </IconButton>
              <Heading as="h2" size="5">
                Judul Permasalahan
              </Heading>
            </Flex>
            <Flex direction="column" width="100%" gap="5" pl={{ md: "8" }}>
              <Box style={{ height: "6rem" }}>
                <TextArea
                  className="w-full "
                  placeholder="Tuliskan judul permasalahan yang sedang kamu alami..."
                  size={"3"}
                  {...register("title")}
                />
                <Text as="p" size="1" color="red" mt="2">
                  {errors.title?.message}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Flex direction="column" gap="5" width="100%" pb="4">
            <Flex direction="row" gap="4" align="center">
              <IconButton
                radius="full"
                asChild
                color={isActive ? undefined : "gray"}
                className="transition-colors delay-100 duration-150 ease-in-out"
              >
                <Text weight="bold">2</Text>
              </IconButton>
              <Heading as="h2" size="5">
                Detail Permasalahan
              </Heading>
            </Flex>
            <Flex direction="column" width="100%" gap="5" pl={{ md: "8" }}>
              <UploadMediaTicket />
              <Flex direction="column" gap="1" width="100%">
                <div className="rt-TextAreaRoot rt-r-size-2 rt-variant-surface w-full">
                  <ReactTextareaAutosize
                    maxRows={12}
                    minRows={5}
                    className="rt-TextAreaInput"
                    placeholder="Ceritakan secara detail masalah atau pertanyaan yang ingin dikonsultasikan..."
                    style={{ width: "100%" }}
                    {...register("detail")}
                  />
                  <div className="rt-TextAreaChrome"></div>
                </div>
                <Text as="p" size="1" color="red">
                  {errors.detail?.message}
                </Text>
              </Flex>
              <Button
                size="3"
                onClick={handleCreate}
                disabled={isPending}
                className="mb-20 md:mb-20 xl:mb-0"
              >
                <Text size="3">Ajukan Formulir</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
