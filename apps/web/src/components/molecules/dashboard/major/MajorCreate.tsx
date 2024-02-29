"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateMajor } from "~/apis/majors/create-major-api";
import Input from "~/components/atoms/form/Input";
import {
  CreateMajorValidator,
  CreateMajorValidatorType,
} from "~/validators/major/create-major-validator";

interface MajorCreateProps {
  session: Session;
}

export default function MajorCreate({ session }: MajorCreateProps) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMajorValidatorType>({
    defaultValues: {
      name: "",
    },
    mode: "onChange",
    resolver: zodResolver(CreateMajorValidator),
  });

  const { mutate, isPending } = useCreateMajor({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["majors"] });
      reset();
      setOpen(false);
      toast({ message: "Berhasil membuat major.", variant: "success" });
    },
    onError: () => {
      toast({ message: "Gagal membuat major.", variant: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
      token: session.token,
      ...data,
    });
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
        <Dialog.Title>Tambah Jurusan</Dialog.Title>
        <Flex asChild direction="column" gap="5">
          <form onSubmit={onSubmit}>
            <Input
              id="major"
              label="Major"
              placeholder="Nama jurusan"
              error={errors.name?.message}
              disabled={isPending}
              {...register("name")}
            />
            <Button className="cursor-pointer" size="3">
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
