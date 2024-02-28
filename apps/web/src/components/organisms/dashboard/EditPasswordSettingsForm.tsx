import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useEditUserPassword } from "~/apis/profile/edit-user-password-api";
import Input from "~/components/atoms/form/Input";
import {
  EditPasswordValidator,
  EditPasswordValidatorType,
} from "~/validators/profile/edit-password-validator";

interface Props {
  session: Session;
}

export default function EditPasswordSettingsForm({ session }: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordValidatorType>({
    mode: "onChange",
    resolver: zodResolver(EditPasswordValidator),
  });

  const { mutate: editUserPasswordHandler, isPending } = useEditUserPassword({
    onSuccess: () => {
      toast("Berhasil edit password.", { variant: "success" });
      router.push("/profile");
    },
    onError: (error) => {
      reset();
      const message = error.response?.data.error || "Gagal mengganti password.";
      toast(message, { variant: "error" });
    },
  });

  const handleEditPassword = handleSubmit((data) => {
    editUserPasswordHandler({
      password: data.newPassword,
      token: session?.token as string,
    });
  });

  return (
    <Flex direction="column" gap="5" className="w-full">
      <Text size="4" weight="bold">
        Ubah Kata Sandi
      </Text>

      <Input
        label="Kata Sandi Baru"
        id="password"
        type="password"
        error={errors.newPassword?.message}
        disabled={isPending}
        {...register("newPassword")}
      />

      <Input
        label="Konfirmasi Kata Sandi"
        id="confirmPassword"
        type="password"
        error={errors.confirmPassword?.message}
        disabled={isPending}
        {...register("confirmPassword")}
      />

      <Flex gap="3" mt="4" justify="end">
        <Link href="/profile">
          <Button className="cursor-pointer" variant="soft" color="gray">
            Batal
          </Button>
        </Link>
        <Button
          className="cursor-pointer"
          variant="soft"
          color="gray"
          onClick={handleEditPassword}
          disabled={isPending}
        >
          Simpan Perubahan
        </Button>
      </Flex>
    </Flex>
  );
}
