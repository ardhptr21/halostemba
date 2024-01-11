"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useRegister } from "~/apis/auth/register-api";
import Input from "~/components/atoms/form/Input";
import {
  RegisterValidator,
  RegisterValidatorType,
} from "~/validators/auth/register-validator";

export default function RegisterForm() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterValidatorType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(RegisterValidator),
  });
  const router = useRouter();
  const { enqueueSnackbar: toast } = useSnackbar();

  const { mutate: registerHandler, isPending } = useRegister({
    onError: () => {
      reset({ password: "", confirmPassword: "" });
      toast("Gagal membuat akun, coba lagi", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "bottom" },
      });
    },
    onSuccess: () => {
      reset();
      toast("Berhasil membuat akun, silahkan login", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
      router.push("/masuk");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    registerHandler(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full gap-6 px-5 mx-auto md:w-3/4"
    >
      <Input
        label="Nama Lengkap"
        id="name"
        placeholder="Masukkan nama lengkapmu"
        error={errors.name?.message}
        disabled={isPending}
        {...register("name")}
      />
      <Input
        label="Email"
        id="email"
        placeholder="Masukkan email"
        error={errors.email?.message}
        disabled={isPending}
        {...register("email")}
      />
      <Input
        type="password"
        label="Kata Sandi"
        id="password"
        placeholder="Masukan kata sandi"
        error={errors.password?.message}
        disabled={isPending}
        {...register("password")}
      />
      <Input
        type="password"
        label="Ulangi Kata Sandi"
        id="confirmPassword"
        placeholder="Konfirmasi kata sandi"
        error={errors.confirmPassword?.message}
        disabled={isPending}
        {...register("confirmPassword")}
      />
      <Button
        size="3"
        type="submit"
        style={{ cursor: "pointer" }}
        disabled={isPending}
      >
        Daftar
      </Button>
    </form>
  );
}
