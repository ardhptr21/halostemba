"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertDialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/alert-dialog";
import { useSnackbar } from "notistack";
import { useDeleteMenfessApi } from "~/apis/menfess/delete-menfess-api";

interface Props extends AlertDialogRootProps {
  menfessId: string;
}

export default function DeleteMenfessModal({ menfessId, ...props }: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: deleteMenfess, isPending } = useDeleteMenfessApi({
    onError: (error) => {
      const message =
        error.response?.data.error || "Gagal menghapus menfess, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["list-menfess"],
      });
      router.replace("/");
      const message = data.message || "Berhasil menghapus menfess.";
      toast(message, { variant: "success" });
    },
  });

  const handleClick = () => {
    deleteMenfess({ id: menfessId, token: session?.token as string });
  };

  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content>
        <Flex justify="center"></Flex>
        <AlertDialog.Title>Hapus menfess!</AlertDialog.Title>
        <AlertDialog.Description color="gray">
          Apakah kamu yakin? Menfess yang sudah dihapus tidak bisa dikembalikan!
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
