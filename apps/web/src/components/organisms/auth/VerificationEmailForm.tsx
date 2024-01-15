import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEmailVerification } from "~/apis/auth/email-verification-api";
import Input from "~/components/atoms/form/Input";
import { useVerificationEmailStore } from "~/store/auth/verification-email-store";
import {
  EmailVerificationValidator,
  EmailVerificationValidatorType,
} from "~/validators/auth/email-verification-validator";

export default function VerificationEmailForm() {
  const { email, setEmail } = useVerificationEmailStore();
  const [state, setState] = useState<"init" | "success" | "error">("init");
  const { enqueueSnackbar: toast } = useSnackbar();
  const { data: session, status } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<EmailVerificationValidatorType>({
    defaultValues: {
      email: email || session?.user.email || "",
    },
    mode: "onChange",
    resolver: zodResolver(EmailVerificationValidator),
  });

  const { mutate: emailVerificationHandler, isPending } = useEmailVerification({
    onSuccess: (data) => {
      const message = data.message || "Berhasil mengirim email verifikasi.";
      toast(message, { variant: "success" });
      setState("success");
    },
    onError: (error) => {
      const message =
        error.response?.data.error || "Gagal mengirim email verifikasi.";
      toast(message, { variant: "error" });
      setState("error");
    },
    onSettled: () => {
      setEmail(getValues("email"));
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      setValue("email", session?.user.email || getValues("email"));
      setEmail(session?.user.email || email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (email && state === "init") {
      emailVerificationHandler({ email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, state]);

  const onSubmit = handleSubmit((data) => {
    emailVerificationHandler(data);
  });

  return (
    <>
      <Flex gap="2" align="center" direction="column" className="text-center">
        <Heading size="7">Verifikasi Email</Heading>
        {state === "init" ? (
          <Text as="p" size="5">
            Masukkan email untuk melakukan verifikasi.
          </Text>
        ) : null}
        {state === "success" ? (
          <Text as="p" size="4">
            Kami sudah mengirimkan email verifikasi ke{" "}
            <Text color="indigo" weight="bold">
              {email}
            </Text>
            . Kamu harus memverifikasi emailmu agar bisa masuk ke halostemba.
          </Text>
        ) : null}
        {state === "error" ? (
          <Text as="p" size="4">
            Gagal mengirim email verifikasi ke{" "}
            <Text color="indigo" weight="bold">
              {email}
            </Text>
            . Silahkan coba lagi.
          </Text>
        ) : null}
      </Flex>
      {state === "init" ? (
        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            label="Email"
            id="email"
            placeholder="Masukkan email kamu."
            disabled={isPending}
            error={errors.email?.message}
            {...register("email")}
          />
          <div className="text-center w-full">
            <Button
              type="submit"
              className="w-full"
              size="4"
              style={{ cursor: "pointer" }}
              disabled={isPending}
            >
              Kirim
            </Button>
          </div>
        </form>
      ) : null}
      {state !== "init" ? (
        <Button
          size="3"
          style={{ cursor: "pointer" }}
          disabled={isPending}
          onClick={() => emailVerificationHandler({ email: email! })}
        >
          Kirim Ulang
        </Button>
      ) : null}
    </>
  );
}
