"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "~/apis/auth/forgot-password-api";
import Input from "~/components/atoms/form/Input";
import { useForgotPasswordStore } from "~/store/auth/forgot-password-store";
import {
  ForgotPasswordValidator,
  ForgotPasswordValidatorType,
} from "~/validators/auth/forgot-password-validator";

export default function ForgotPasswordForm() {
  const { setEmail } = useForgotPasswordStore();
  const { enqueueSnackbar: toast } = useSnackbar();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<ForgotPasswordValidatorType>({
    defaultValues: { email: "" },
    mode: "onChange",
    resolver: zodResolver(ForgotPasswordValidator),
  });

  const { mutate: forgotPasswordHandler, isPending } = useForgotPassword({
    onError: (error) => {
      reset({ email: "" });
      const message =
        error.response?.data.error || "Gagal mengirim OTP, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: (data) => {
      setEmail(getValues("email"));
      reset();
      const message = data.message || "Berhasil mengirim OTP, cek email kamu.";
      toast(message, { variant: "success" });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    forgotPasswordHandler(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full gap-6 px-5 mx-auto md:w-3/4"
    >
      <Input
        label="Email"
        id="email"
        placeholder="Masukkan email"
        error={errors.email?.message}
        disabled={isPending}
        {...register("email")}
      />
      <Button size="3" style={{ cursor: "pointer" }} disabled={isPending}>
        Kirim OTP
      </Button>
    </form>
  );
}
