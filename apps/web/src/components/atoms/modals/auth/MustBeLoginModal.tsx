"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

import { AlertDialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/alert-dialog";

export default function MustBeLoginModal(props: AlertDialogRootProps) {
  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content>
        <AlertDialog.Title align="center">Kamu Belum Masuk</AlertDialog.Title>
        <AlertDialog.Description color="gray" align="center">
          Masuk ke akunmu terlebih dahulu untuk melanjutkan!
        </AlertDialog.Description>
        <Flex justify="end" gap="3" mt="5">
          <AlertDialog.Cancel>
            <Button size="3" variant="outline">
              Batal
            </Button>
          </AlertDialog.Cancel>
          <Button size="3" asChild>
            <Link href="/masuk">Masuk</Link>
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
