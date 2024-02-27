"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateUser } from "~/apis/user/create-user-api";
import Input from "~/components/atoms/form/Input";
import {
  CreateUserValidator,
  CreateUserValidatorType,
} from "~/validators/user/create-user-validator";

interface UserCreateProps {
  session: Session;
}

export default function UserCreate({ session }: UserCreateProps) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateUserValidatorType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "TEACHER",
    },
    mode: "onChange",
    resolver: zodResolver(CreateUserValidator),
  });

  const { mutate, isPending } = useCreateUser({
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["users", "list"] });
      router.push("/dashboard/user");
      router.refresh();
      reset();
      setOpen(false);
      toast({ message: "Berhasil membuat user.", variant: "success" });
    },
    onError: () => {
      toast({ message: "Gagal membuat user.", variant: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({ token: session.token, ...data });
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          variant="outline"
          size="3"
          color="gray"
          className="cursor-pointer"
        >
          <PlusCircledIcon />
          Tambah
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Tambah User</Dialog.Title>
        <Flex asChild direction="column" gap="5">
          <form onSubmit={onSubmit}>
            <Input
              id="name"
              label="Nama"
              placeholder="Gigi Hadid"
              error={errors.name?.message}
              disabled={isPending}
              {...register("name")}
            />
            <Input
              id="email"
              label="Email"
              placeholder="gigihadid@gmail.com"
              error={errors.email?.message}
              disabled={isPending}
              {...register("email")}
            />
            <Flex direction="column" gap="2">
              <Text as="label">Role</Text>
              <Select.Root
                size="3"
                disabled={isPending}
                value={getValues("role")}
                onValueChange={(v) =>
                  setValue("role", v as any, { shouldValidate: true })
                }
              >
                <Select.Trigger placeholder="Pilih Role" />
                <Select.Content className="w-full">
                  <Select.Item value="ADMIN">ADMIN</Select.Item>
                  <Select.Item value="TEACHER">TEACHER</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
            <Input
              type="password"
              id="password"
              label="Kata Sandi"
              placeholder="*********"
              error={errors.password?.message}
              disabled={isPending}
              {...register("password")}
            />
            <Button className="cursor-pointer" size="3" disabled={isPending}>
              Simpan dan Tambah
            </Button>
          </form>
        </Flex>

        <Dialog.Close type={undefined} disabled={isPending}>
          <Button className="w-full cursor-pointer" mt="3" color="red" size="3">
            Batal
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
