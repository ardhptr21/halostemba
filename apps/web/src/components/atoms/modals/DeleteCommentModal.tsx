"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AlertDialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/alert-dialog";
import { useSnackbar } from "notistack";
import { useDeleteCommentApi } from "~/apis/menfess/delete-comment-api";

interface Props extends AlertDialogRootProps {
  commentId: string;
  menfessId: string;
}

export default function DeleteCommentModal({
  commentId,
  menfessId,
  ...props
}: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: deleteMenfess, isPending } = useDeleteCommentApi({
    onError: (error) => {
      const message =
        error.response?.data.error || "Gagal menghapus komentar, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["detail-menfess", menfessId],
      });
      const message = data.message || "Berhasil menghapus komentar.";
      toast(message, { variant: "success" });
    },
  });

  const handleClick = () => {
    deleteMenfess({ id: commentId, token: session?.token as string });
  };

  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content>
        <Flex justify="center"></Flex>
        <AlertDialog.Title>Hapus komentar!</AlertDialog.Title>
        <AlertDialog.Description color="gray">
          Apakah kamu yakin? Komentar yang sudah dihapus tidak bisa
          dikembalikan!
        </AlertDialog.Description>
        <Flex justify="end" gap="3" mt="5">
          <AlertDialog.Cancel>
            <Button size="3" variant="outline">
              Batal
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              size="3"
              color="red"
              onClick={handleClick}
              disabled={isPending}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
