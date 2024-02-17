import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useResetPassword } from "~/apis/auth/reset-password-api";
import Input from "~/components/atoms/form/Input";
import { useForgotPasswordStore } from "~/store/auth/forgot-password-store";

import {
  ResetPasswordValidator,
  ResetPasswordValidatorType,
} from "~/validators/auth/reset-password.validator";

export default function ResetPasswordForm() {
  const { token } = useForgotPasswordStore();
  const { enqueueSnackbar: toast } = useSnackbar();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValidatorType>({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordValidator),
  });

  const { mutate: resetPasswordHandler, isPending } = useResetPassword({
    onSuccess: (data) => {
      reset();
      const message =
        data.message || "Berhasil mengganti kata sandi, silahkan login.";
      toast(message, { variant: "success" });
      router.replace("/masuk");
    },
    onError: (error) => {
      reset();
      const message =
        error.response?.data.error || "Gagal mengganti kata sandi.";
      toast(message, { variant: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    resetPasswordHandler({ password: data.password, token: token as string });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full gap-6 px-5 mx-auto md:w-3/4"
    >
      <Input
        type="password"
        label="Kata Sandi Baru"
        id="password"
        placeholder="Masukkan kata sandi"
        error={errors.password?.message}
        disabled={isPending}
        {...register("password")}
      />
      <Input
        type="password"
        label="Ulangi Sandi Baru"
        id="password"
        placeholder="Masukkan kata sandi"
        error={errors.confirmPassword?.message}
        disabled={isPending}
        {...register("confirmPassword")}
      />
      <Button size="3" style={{ cursor: "pointer" }} disabled={isPending}>
        Ganti Password
      </Button>
    </form>
  );
}
