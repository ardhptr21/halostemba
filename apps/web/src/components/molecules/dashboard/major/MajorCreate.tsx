"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import Input from "~/components/atoms/form/Input";

export default function MajorCreate() {
  return (
    <Dialog.Root>
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
          <form>
            <Input id="major" label="Major" placeholder="Nama jurusan" />
            <Button className="cursor-pointer" size="3">
              Simpan dan Tambah
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
