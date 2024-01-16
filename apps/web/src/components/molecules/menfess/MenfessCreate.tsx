"use client";

import { FaceIcon, ImageIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Switch,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import TextareaAutosize from "react-textarea-autosize";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { useState } from "react";
import MustBeVerifiedModal from "~/components/atoms/modals/MustBeVerifiedModal";
import { useForm } from "react-hook-form";
import {
  CreateMenfessValidator,
  CreateMenfessValidatorType,
} from "~/validators/menfess/create-menfess-validator";
import { useCreateMenfess } from "~/apis/menfess/create-menfess-api";
import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

export default function MenfessCreate() {
  const { data: session } = useSession();
  const [showMustVerified, setShowMustVerified] = useState(false);
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();

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
      const message =
        error.response?.data.error || "Gagal membuat menfess, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["list-menfess"],
      });
      const message = data.message || "Berhasil membuat menfess.";
      toast(message, { variant: "success" });
    },
  });

  const handleClick = () => {
    if (session?.user.role === "GUEST") {
      setShowMustVerified(true);
      return;
    }
    handleSubmit((data) => {
      createMenfessHandler({ ...data, token: session?.token as string });
    })();
  };

  return (
    <>
      <MustBeVerifiedModal
        open={showMustVerified}
        onOpenChange={setShowMustVerified}
      />
      <Card className="w-full">
        <Flex direction="column">
          <Flex direction="row" gap="2">
            <Box>
              <Image
                src={"/assets/images/avatar.png"}
                width={45}
                height={45}
                alt="avatar"
                className="rounded-md"
              />
            </Box>

            <Flex direction="column" gap="1" width="100%">
              <div className="rt-TextAreaRoot rt-r-size-2 rt-variant-surface w-full ">
                <TextareaAutosize
                  disabled={isPending}
                  maxRows={12}
                  className="rt-TextAreaInput"
                  placeholder="Apa yang sedang terjadi !?"
                  style={{ width: "100%" }}
                  {...register("content")}
                />
                <div className="rt-TextAreaChrome"></div>
              </div>
              <Text as="p" size="1" color="red">
                {errors.content?.message}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="row" pt="3" pl="8" justify="between">
            <Flex direction="row" gap="2" className="mt-2" align={"center"}>
              <ImageIcon
                width={15}
                height={"100%"}
                style={{ color: "#99A2FF" }}
              />
              <FaceIcon
                width={15}
                height={"100%"}
                style={{ color: "#99A2FF" }}
              />
              <Tooltip
                content="Jika diaktifkan, menfess akan dikirim tanpa identitas."
                delayDuration={150}
              >
                <Text as="label" size="1" color="indigo">
                  <Flex gap="2">
                    <Switch
                      size="1"
                      {...register("anonymous")}
                      defaultChecked
                      onCheckedChange={(value) => setValue("anonymous", value)}
                    />{" "}
                    Kirim sebagai anonim?
                  </Flex>
                </Text>
              </Tooltip>
            </Flex>
            <Button size="2" onClick={handleClick} disabled={isPending}>
              Posting
            </Button>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
