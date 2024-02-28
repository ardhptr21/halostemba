"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { DialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/dialog";
import { useSnackbar } from "notistack";
import { useAcceptVerification } from "~/apis/verification/accept-verification-api";

interface Props extends DialogRootProps {
  userId: string | null;
  session: Session;
}

export default function RequestAcceptModal({
  userId,
  session,
  onOpenChange,
  ...props
}: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useAcceptVerification({
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["verification", "list"] });
      router.push("/dashboard/request");
      router.refresh();
      onOpenChange && onOpenChange(false);
      toast({
        message: "Penerimaan request berhasil.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Penerimaan request gagal.",
        variant: "error",
      });
    },
  });

  const handleClick = () => {
    if (!userId) return;
    mutate({ id: userId, token: session.token });
  };

  return (
    <AlertDialog.Root {...props} onOpenChange={onOpenChange}>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Terima request?</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Sudah yakin akan menerima request ini? pastikan data yang diberikan
          sudah benar.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              type={undefined}
              color="gray"
              disabled={isPending}
            >
              Batal
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="green"
              type={undefined}
              disabled={isPending}
              onClick={handleClick}
            >
              Terima
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
