"use client";

import { Box, Button, Flex, Text, TextFieldInput } from "@radix-ui/themes";
import { useSnackbar } from "notistack";
import { FormEvent, useState } from "react";
import OtpInput from "react-otp-input";
import { useForgotPassword } from "~/apis/auth/forgot-password-api";
import { useVerifyForgotPasswordOTP } from "~/apis/auth/verify-forgot-password-otp-api";
import { useForgotPasswordStore } from "~/store/auth/forgot-password-store";

export default function VerifyForgotPasswordOTP() {
  const { email, setToken } = useForgotPasswordStore();
  const { enqueueSnackbar: toast } = useSnackbar();
  const [otp, setOtp] = useState("");

  const {
    mutate: sendForgotPasswordHandler,
    isPending: sendForgotPasswordPending,
  } = useForgotPassword({
    onError: (error) => {
      const message =
        error.response?.data.error || "Gagal mengirim OTP, coba lagi.";
      toast(message, { variant: "error" });
    },
    onSuccess: (data) => {
      const message = data.message || "Berhasil mengirim OTP, cek email kamu.";
      toast(message, { variant: "success" });
    },
  });

  const { mutate: verifyForgotPasswordHandler, isPending } =
    useVerifyForgotPasswordOTP({
      onSuccess: (data) => {
        setToken(data.token);
        const message = data.message || "Berhasil verifikasi OTP.";
        toast(message, { variant: "success" });
      },
      onError: (error) => {
        const message =
          error.response?.data.error || "Verifikasi OTP gagal, coba lagi.";
        toast(message, { variant: "error" });
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyForgotPasswordHandler({ otp, email: email as string });
  };

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
        </Flex>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          containerStyle="gap-3"
          inputStyle={{
            width: "100%",
            height: "100%",
            aspectRatio: "1/1",
            textIndent: 0,
          }}
          renderInput={(props) => (
            <TextFieldInput
              size="3"
              disabled={isPending || sendForgotPasswordPending}
              {...props}
            />
          )}
        />
      </Box>

      <Button
        size="3"
        style={{ cursor: "pointer" }}
        disabled={isPending || sendForgotPasswordPending}
      >
        Verifikasi OTP
      </Button>
      <Button
        variant="outline"
        size="3"
        onClick={() => sendForgotPasswordHandler({ email: email as string })}
        style={{ cursor: "pointer" }}
        disabled={isPending || sendForgotPasswordPending}
      >
        Kirim Ulang
      </Button>
    </form>
  );
}
