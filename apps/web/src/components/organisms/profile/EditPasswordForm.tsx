"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Link as RLink, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
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

export default function EditPasswordForm({ session }: Props) {
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
    <>
      <Flex direction="column" className="w-full">
        <Flex direction="column" gap="4">
          <Flex direction="row" align="center" mb="2" gap="4">
            <Link href="/profile">
              <Cross1Icon className="cursor-pointer" />
            </Link>
            <Text size="4" weight="bold">
              Ubah Kata Sandi
            </Text>
          </Flex>

          <Flex direction="row" gap="8" py="4">
            <Flex direction="column" className="w-full">
              <Flex direction="column" gap="4">
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  mb="4"
                  px="4"
                >
                  <Heading size="6" weight="bold" mb="1">
                    Kata Sandi
                  </Heading>
                  <Text align="center">
                    Masukkan kata sandi saat ini untuk merubah kata sandimu.
                  </Text>
                  <RLink href="/lupa-sandi">Lupa Kata Sandi?</RLink>
                </Flex>

                <Flex direction="column" gap="5" className="w-full">
                  <Flex direction="row" justify="between" align="center">
                    <Text as="label" weight="bold" className="w-1/2 xl:w-1/3">
                      Kata Sandi Baru
                    </Text>
                    <Input
                      type="password"
                      label=""
                      id="newPassword"
                      error={errors.newPassword?.message}
                      disabled={isPending}
                      className="w-full"
                      {...register("newPassword")}
                    />
                  </Flex>
                  <Flex direction="row" justify="between" align="center">
                    <Text as="label" weight="bold" className="w-1/2 xl:w-1/3">
                      Konfirmasi Kata Sandi
                    </Text>
                    <Input
                      type="password"
                      label=""
                      id="confirmPassword"
                      error={errors.confirmPassword?.message}
                      disabled={isPending}
                      className="w-full"
                      {...register("confirmPassword")}
                    />
                  </Flex>
                </Flex>

                <Flex
                  direction={{ initial: "column", xl: "row" }}
                  gap="3"
                  mt="4"
                  justify="end"
                >
                  <Link href="/profile">
                    <Button
                      className="cursor-pointer w-full "
                      variant="soft"
                      color="gray"
                    >
                      Batal
                    </Button>
                  </Link>
                  <Button
                    className="cursor-pointer"
                    onClick={handleEditPassword}
                    disabled={isPending}
                  >
                    Simpan dan Perbaharui
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
