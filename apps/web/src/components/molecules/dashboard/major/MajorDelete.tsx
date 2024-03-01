"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { AlertDialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/alert-dialog";
import { useSnackbar } from "notistack";
import { useDeleteMajor } from "~/apis/majors/delete-major-api";

interface Props extends AlertDialogRootProps {
  majorId: string | null;
  session: Session;
}

export default function DeleteMajorModal({
  majorId,
  session,
  onOpenChange,
  ...props
}: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteMajor, isPending } = useDeleteMajor({
    onError: (error) => {
      const message =
        error.response?.data.error || "Gagal menghapus jurusan, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["majors", "list"] });
      router.push("/dashboard/major");
      router.refresh();
      const message = data.message || "Berhasil menghapus jurusan.";
      toast(message, { variant: "success" });
    },
  });

  const handleClick = () => {
    if (!majorId) return;
    deleteMajor({ id: majorId, token: session?.token as string });
  };

  return (
    <AlertDialog.Root onOpenChange={onOpenChange} {...props}>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <Flex justify="center"></Flex>
        <AlertDialog.Title>Hapus Jurusan!</AlertDialog.Title>
        <AlertDialog.Description color="gray">
          Apakah kamu yakin? Jurusan yang sudah dihapus tidak bisa dikembalikan!
        </AlertDialog.Description>
        <Flex justify="end" gap="3" mt="5">
          <AlertDialog.Cancel>
            <Button
              size="3"
              variant="solid"
              type={undefined}
              className="cursor-pointer"
            >
              Batal
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              size="3"
              color="red"
              variant="solid"
              onClick={handleClick}
              disabled={isPending}
              type={undefined}
              className="cursor-pointer"
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
