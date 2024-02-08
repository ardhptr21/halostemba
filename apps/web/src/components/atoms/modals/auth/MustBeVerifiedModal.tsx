"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Image from "next/image";

import { AlertDialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/alert-dialog";

export default function MustBeVerifiedModal(props: AlertDialogRootProps) {
  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content>
        <Flex justify="center">
          <Image
            src="/assets/images/action/not-verified.png"
            alt="account not verified"
            className="w-52 xl:w-64"
            width={400}
            height={400}
          />
        </Flex>
        <Flex
          direction="column"
          align={{ initial: "center", xl: "stretch" }}
          px={{ initial: "6", xl: "4" }}
        >
          <AlertDialog.Title>Belum Terverifikasi</AlertDialog.Title>
          <AlertDialog.Description
            color="gray"
            align={{ initial: "center", xl: "left" }}
          >
            Agar bisa membuat menfessmu sendiri, verifikasi akunmu terlebih
            dahulu yuk!
          </AlertDialog.Description>
          <Flex justify="end" gap="3" mt="5">
            <AlertDialog.Cancel>
              <Button size="3" variant="outline">
                Batal
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button size="3" style={{ cursor: "pointer" }}>
                Verifikasi
              </Button>
            </AlertDialog.Action>
          </Flex>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
