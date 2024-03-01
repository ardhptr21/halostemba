"use client";

import { MajorEntity } from "@halostemba/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { DialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/dialog";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEditMajor } from "~/apis/majors/edit-major-api";
import Input from "~/components/atoms/form/Input";
import {
  CreateMajorValidator,
  CreateMajorValidatorType,
} from "~/validators/major/create-major-validator";

interface Props extends DialogRootProps {
  major?: MajorEntity | null;
  session: Session;
}

export default function EditMajorModal({
  major,
  session,
  onOpenChange,
  ...props
}: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateMajorValidatorType>({
    defaultValues: {
      name: major?.name as string,
    },
    mode: "onChange",
    resolver: zodResolver(CreateMajorValidator),
  });

  console.log(major);

  const { mutate: EditMajor, isPending } = useEditMajor({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["majors"] });
      router.push("/dashboard/major");
      router.refresh();
      reset();
      toast({ message: "Berhasil mengedit major.", variant: "success" });
      onOpenChange && onOpenChange(false);
    },
    onError: () => {
      toast({ message: "Gagal mengedit major.", variant: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    EditMajor({
      token: session.token as string,
      id: major?.id as string,
      ...data,
    });
  });

  useEffect(() => {
    setValue("name", major?.name as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [major]);

  return (
    <Dialog.Root onOpenChange={onOpenChange} {...props}>
      <Dialog.Content>
        <Dialog.Title>Edit Jurusan</Dialog.Title>
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
              Simpan
            </Button>
          </form>
        </Flex>

        <Dialog.Close>
          <Button className="w-full cursor-pointer" mt="3" color="red" size="3">
            Batal
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
