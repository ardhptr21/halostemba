"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import Input from "~/components/atoms/form/Input";
import UploadMediaProfile from "~/components/molecules/profile/UploadMediaProfile";

interface Props {
  session: Session;
}

export default function EditSettingsForm({ session }: Props) {
  return (
    <>
      <Flex direction="column" className="w-full">
        <Flex direction="column" gap="8" py="4">
          <UploadMediaProfile avatar={session.user.avatar} />
          <Flex direction="column" className="w-full">
            <Flex direction="column" gap="5">
              <Text size="4" weight="bold">
                Ubah Informasi Akun
              </Text>

              <Input
                label="Email"
                id="email"
                type="email"
                value={session.user.email}
              />

              <Input
                label="Nama"
                id="name"
                type="text"
                value={session.user.name}
              />

              <Input
                label="Username"
                id="username"
                type="text"
                value={session.user.username}
              />

              <Flex gap="3" mt="4" justify="end">
                <Link href="/profile">
                  <Button
                    className="cursor-pointer"
                    variant="soft"
                    color="gray"
                  >
                    Batal
                  </Button>
                </Link>
                <Button className="cursor-pointer">Simpan Perubahan</Button>
              </Flex>
            </Flex>

            <Flex direction="column" gap="5" className="w-full">
              <Text size="4" weight="bold">
                Ubah Kata Sandi
              </Text>

              <Input label="Kata Sandi Baru" id="password" type="password" />
              <Input
                label="Konfirmasi Kata Sandi"
                id="confirmPassword"
                type="password"
              />

              <Flex gap="3" mt="4" justify="end">
                <Link href="/profile">
                  <Button
                    className="cursor-pointer"
                    variant="soft"
                    color="gray"
                  >
                    Batal
                  </Button>
                </Link>
                <Button className="cursor-pointer">Simpan Perubahan</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
