"use client";

import { AdminVerificationEntity } from "@halostemba/entities";
import { AspectRatio, Box, Dialog, Flex } from "@radix-ui/themes";
import { format } from "date-fns";
import Image from "next/image";
import { DialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/dialog";
import Input from "~/components/atoms/form/Input";

interface Props extends DialogRootProps {
  request: AdminVerificationEntity | null;
}

export default function DetailRequestModal({ request, ...props }: Props) {
  if (!request) return null;

  return (
    <Dialog.Root {...props}>
      <Dialog.Content>
        <Dialog.Title>Request Detail</Dialog.Title>
        <AspectRatio
          ratio={16 / 9}
          className="p-2 rounded-lg border-2 border-gray-500 border-dashed"
        >
          <Box className="relative w-full h-full overflow-hidden rounded-lg">
            <Image
              src={request.idCard as string}
              alt={request.user.name as string}
              fill
              sizes="100%"
            />
          </Box>
        </AspectRatio>
        <Flex direction="column" gap="5" mt="5">
          <Input id="id" label="ID Request" value={request.id} readOnly />
          <Input id="name" label="Nama" value={request.user.name} readOnly />
          <Input id="email" label="Email" value={request.user.email} readOnly />
          <Input id="nis" label="NIS" value={request.nis} readOnly />
          <Input
            id="major"
            label="Jurusan"
            value={request.major.name}
            readOnly
          />
          <Input
            id="reason"
            label="Tanggal Request"
            value={format(new Date(request.createdAt), "dd MMMM yyyy, HH:mm")}
            readOnly
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
