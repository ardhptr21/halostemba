"use client";

import { Dialog } from "@radix-ui/themes";
import Image from "next/image";
import { DialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/dialog";

interface Props extends DialogRootProps {
  src: string;
}

export default function ShowImageModal({ src, ...props }: Props) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Content
        className="h-screen"
        style={{
          background: "none",
          border: 0,
          boxShadow: "none",
          padding: "0",
        }}
      >
        <div className="w-full h-full relative">
          <Image
            fill
            sizes="100%"
            src={src}
            alt={src}
            className="w-full h-full object-contain"
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
