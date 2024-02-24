"use client";

import {
  Button,
  Flex,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
} from "@radix-ui/themes";
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
            {/* Ubah Profil */}
            <Flex direction="column" gap="5">
              <Text size="4" weight="bold">
                Ubah Informasi Akun
              </Text>

              <Flex direction="column">
                <Input label="Nama" id="name" />
              </Flex>

              <Flex direction="column" gap="2">
                <Text as="label">Jenis Kelamin</Text>
                <SelectRoot defaultValue="Laki-laki" size="3">
                  <SelectTrigger />
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </SelectRoot>
              </Flex>

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

            {/* Ubah Email dan Sandi */}
            <Flex direction="column" gap="5" className="w-full">
              <Text size="4" weight="bold">
                Ubah Email dan Kata Sandi
              </Text>

              <Flex direction="column">
                <Input label="Email" id="email" />
              </Flex>

              <Flex direction="column">
                <Input
                  type="password"
                  label="Kata Sandi Baru"
                  id="newPassword"
                  className="w-full"
                />
              </Flex>

              <Flex direction="column">
                <Input
                  type="password"
                  label="Konfirmasi Kata Sandi"
                  id="confirmPassword"
                />
              </Flex>

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
