"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  Box,
  Button,
  Flex,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { DialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/dialog";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useRejectVerification } from "~/apis/verification/reject-verification-api";
import {
  RejectVerificationValidator,
  RejectVerificationValidatorType,
} from "~/validators/verification/reject-verification-validator";

interface Props extends DialogRootProps {
  userId: string | null;
  session: Session;
}

export default function RequestRejectModal({
  userId,
  session,
  onOpenChange,
  ...props
}: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RejectVerificationValidatorType>({
    defaultValues: {
      note: "",
    },
    mode: "onChange",
    resolver: zodResolver(RejectVerificationValidator),
  });

  const { mutate, isPending } = useRejectVerification({
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["verification", "list"] });
      router.push("/dashboard/request");
      router.refresh();
      reset();
      onOpenChange && onOpenChange(false);
      toast({
        message: "Penolakan request berhasil.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Penolakan request gagal.",
        variant: "error",
      });
    },
  });

  const handleClick = handleSubmit((data) => {
    if (!userId) return;
    mutate({ id: userId, token: session.token, note: data.note });
  });

  return (
    <AlertDialog.Root onOpenChange={onOpenChange} {...props}>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Tolak request?</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Yakin akan menolak request ini? berikan alasan mengapa request ini
          ditolak.
        </AlertDialog.Description>

        <Box>
          <TextArea
            className="mt-5"
            placeholder="Berikan alasan penolakan..."
            rows={6}
            size="2"
            disabled={isPending}
            {...register("note")}
          ></TextArea>
          {errors.note?.message && (
            <Text as="p" color="red" size="1" mt="2">
              {errors.note.message}
            </Text>
          )}
        </Box>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" type={undefined} color="gray">
              Batal
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              type={undefined}
              onClick={handleClick}
              disabled={isPending}
            >
              Tolak
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
