import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useCreateComment } from "~/apis/menfess/create-comment-api";
import MustBeVerifiedModal from "~/components/atoms/modals/MustBeVerifiedModal";
import {
  CreateCommentValidator,
  CreateCommentValidatorType,
} from "~/validators/menfess/create-comment-validator";

export default function CommentCreate({ menfessId }: { menfessId: string }) {
  const { data: session } = useSession();
  const [showMustVerified, setShowMustVerified] = useState(false);
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCommentValidatorType>({
    defaultValues: {
      content: "",
    },
    mode: "onChange",
    resolver: zodResolver(CreateCommentValidator),
  });

  const { mutate: createMenfessHandler, isPending } = useCreateComment({
    onError: (error) => {
      const message =
        error.response?.data.error || "Gagal membuat menfess, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["detail-menfess", menfessId],
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
      createMenfessHandler({
        ...data,
        menfessId,
        token: session?.token as string,
      });
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
                <ReactTextareaAutosize
                  disabled={isPending}
                  maxRows={12}
                  className="rt-TextAreaInput"
                  placeholder="Kirimkan komentarmu..."
                  style={{ width: "100%" }}
                  {...register("content")}
                />
                <div className="rt-TextAreaChrome"></div>
              </div>
              <Text color="red" size="1">
                {errors.content?.message}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="row" pt="3" pl="8" justify="end">
            <Button
              disabled={isPending}
              size="2"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              Kirim
            </Button>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
