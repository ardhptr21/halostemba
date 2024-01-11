"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Link as RLink } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import Input from "~/components/atoms/form/Input";
import {
  LoginValidator,
  LoginValidatorType,
} from "~/validators/auth/login-validator";

export default function LoginForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginValidatorType>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(LoginValidator),
  });
  const router = useRouter();
  const { enqueueSnackbar: toast } = useSnackbar();

  const onSubmit = handleSubmit(async (data) => {
    const status = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (status?.ok) {
      router.push("/");
      toast("Berhasil masuk, selamat datang di halostemba.", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
      return;
    }

    toast("Gagal masuk, coba lagi.", {
      variant: "error",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full gap-6 px-5 mx-auto md:w-3/4"
    >
      <Input
        label="Username"
        id="username"
        placeholder="Masukkan username atau email"
        error={errors.username?.message}
        disabled={isSubmitting}
        {...register("username")}
      />
      <Input
        type="password"
        label="Password"
        id="password"
        placeholder="Masukan kata sandi"
        error={errors.password?.message}
        disabled={isSubmitting}
        {...register("password")}
      />
      <Button
        size="3"
        type="submit"
        style={{ cursor: "pointer" }}
        disabled={isSubmitting}
      >
        Masuk
      </Button>
      <RLink asChild className="text-center">
        <Link href="/lupa-sandi">Lupa kata sandi?</Link>
      </RLink>
    </form>
  );
}
