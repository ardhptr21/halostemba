"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextFieldInput } from "@radix-ui/themes";
import { useSnackbar } from "notistack";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useVerifyForgotPasswordOTP } from "~/apis/auth/verify-forgot-password-otp-api";
import { useForgotPasswordStore } from "~/store/auth/forgot-password-store";
import {
  VerifyOTPValidator,
  VerifyOTPValidatorType,
} from "~/validators/auth/verify-forgot-password-otp-validator";

export default function VerifyOTP() {
  const { email, setToken } = useForgotPasswordStore();
  const { enqueueSnackbar: toast } = useSnackbar();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOTPValidatorType>({
    mode: "onChange",
    resolver: zodResolver(VerifyOTPValidator),
  });

  const changeOTPFocus =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" && index === 1) return;
      if (value === "" && index > 1) {
        const prevSibling = e.target.parentElement?.previousElementSibling
          ?.firstElementChild as HTMLInputElement;
        prevSibling?.focus();
        return;
      }

      const numValue = Number(value);
      if (numValue < 0 || numValue > 9) return;

      if (index < 6) {
        const nextSibling = e.target.parentElement?.nextElementSibling
          ?.firstElementChild as HTMLInputElement;
        nextSibling?.focus();
      }
    };

  const { mutate: verifyForgotPasswordHandler, isPending } =
    useVerifyForgotPasswordOTP({
      onSuccess: (data) => {
        setToken(data.token);
        reset();
        toast("Verifikasi OTP berhasil.", {
          variant: "success",
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
      },
      onError: () => {
        reset();
        toast("Verifikasi OTP gagal, coba lagi.", {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
      },
    });

  const onSubmit = handleSubmit((data) => {
    const otp = Object.values(data).join("");
    verifyForgotPasswordHandler({ otp, email: email as string });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full gap-6 px-5 mx-auto md:w-3/4"
    >
      <Box>
        <Flex justify="between">
          <Text as="label" htmlFor="email" mb="2" className="block">
            Masukkan Kode Verifikasi
          </Text>

          <Text className="block">01.00</Text>
        </Flex>
        <Flex direction="row" gap="2">
          <TextFieldInput
            type="number"
            size="3"
            className="text-center"
            disabled={isPending}
            variant={errors.otp1 ? "soft" : "classic"}
            color={errors.otp1 ? "red" : "indigo"}
            onInput={changeOTPFocus(1)}
            {...register("otp1")}
          />
          <TextFieldInput
            type="number"
            size="3"
            className="text-center"
            disabled={isPending}
            variant={errors.otp2 ? "soft" : "classic"}
            color={errors.otp2 ? "red" : "indigo"}
            onInput={changeOTPFocus(2)}
            {...register("otp2")}
          />
          <TextFieldInput
            type="number"
            size="3"
            className="text-center"
            disabled={isPending}
            variant={errors.otp3 ? "soft" : "classic"}
            color={errors.otp3 ? "red" : "indigo"}
            onInput={changeOTPFocus(3)}
            {...register("otp3")}
          />
          <TextFieldInput
            type="number"
            size="3"
            className="text-center"
            disabled={isPending}
            variant={errors.otp4 ? "soft" : "classic"}
            color={errors.otp4 ? "red" : "indigo"}
            onInput={changeOTPFocus(4)}
            {...register("otp4")}
          />
          <TextFieldInput
            type="number"
            size="3"
            className="text-center"
            disabled={isPending}
            variant={errors.otp5 ? "soft" : "classic"}
            color={errors.otp5 ? "red" : "indigo"}
            onInput={changeOTPFocus(5)}
            {...register("otp5")}
          />
          <TextFieldInput
            type="number"
            size="3"
            className="text-center"
            disabled={isPending}
            variant={errors.otp6 ? "soft" : "classic"}
            color={errors.otp6 ? "red" : "indigo"}
            onInput={changeOTPFocus(6)}
            {...register("otp6")}
          />
        </Flex>
      </Box>

      <Button
        size="3"
        type="submit"
        style={{ cursor: "pointer" }}
        disabled={isPending}
      >
        Verifikasi OTP
      </Button>
      <Button
        variant="outline"
        size="3"
        type="submit"
        style={{ cursor: "pointer" }}
        disabled={isPending}
      >
        Kirim Ulang
      </Button>
    </form>
  );
}
