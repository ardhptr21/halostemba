"use client";

import { Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { ButtonProps } from "node_modules/@radix-ui/themes/dist/esm/components/button";
import { useSnackbar } from "notistack";
import { PropsWithChildren } from "react";
import { useEmailVerification } from "~/apis/auth/email-verification-api";

interface Props extends ButtonProps, PropsWithChildren {}

export default function SendEmailVerification({ children, ...props }: Props) {
  const { data: session } = useSession();
  const { enqueueSnackbar: toast } = useSnackbar();

  const { mutate: emailVerificationHandler } = useEmailVerification({
    onSuccess: () => {
      toast("Email verifikasi telah dikirim ke email kamu.", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    },
    onError: () => {
      toast("Gagal mengirim email verifikasi, coba lagi.", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    },
  });

  const handleClick = () => {
    emailVerificationHandler({
      email: session?.user.email as string,
      token: session?.token as string,
    });
  };

  return (
    <Button onClick={handleClick} style={{ cursor: "pointer" }} {...props}>
      {children}
    </Button>
  );
}
