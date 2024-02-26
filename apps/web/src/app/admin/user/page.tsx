"use client";

import {
  CalendarIcon,
  Cross2Icon,
  EnvelopeClosedIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  Heading,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRowHeaderCell,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { TableBody, TableCell, TableRow } from "@tremor/react";
import Image from "next/image";
import Input from "~/components/atoms/form/Input";
import AdminDashboardLayout from "~/components/layouts/admin/AdminDashboardLayout";

const data = [
  {
    avatar: "/assets/images/avatar.png",
    name: "Viola Amherd",
    role: "User",
    email: "halostemba@gmail.com",
  },
  {
    avatar: "/assets/images/avatar.png",
    name: "Amherd Viola",
    role: "Admin",
    email: "halostemba@gmail.com",
  },
  {
    avatar: "/assets/images/avatar.png",
    name: "Amherd Viola",
    role: "Konselor",
    email: "halostemba@gmail.com",
  },
  {
    avatar: "/assets/images/avatar.png",
    name: "Amherd Viola",
    role: "STEMBA CLUB",
    email: "halostemba@gmail.com",
  },
];

export default function User() {
  return (
    <AdminDashboardLayout>
      <Flex
        direction="column"
        gap="6"
        width="100%"
        className="px-16 py-9 mx-auto"
      >
        <Flex direction="row" width="100%" justify="between">
          <Heading size="8">User</Heading>
          <Flex direction="row" gap="4">
            <TextFieldRoot>
              <Flex direction="row" align="center">
                <TextFieldSlot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextFieldSlot>
                <TextFieldInput radius="large" placeholder="Search" size="3" />
              </Flex>
            </TextFieldRoot>

            <Flex gap="2" align="center">
              <SelectRoot size="3">
                <SelectTrigger
                  placeholder="Filter"
                  className="cursor-pointer"
                />
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="konselor">Konselor</SelectItem>
                  <SelectItem value="STEMBA CLUB">STEMBA CLUB</SelectItem>
                </SelectContent>
              </SelectRoot>

              <DialogRoot>
                <DialogTrigger>
                  <Button
                    variant="surface"
                    color="gray"
                    size="3"
                    className="cursor-pointer"
                  >
                    <PlusCircledIcon />
                    <Text weight="regular">Tambah</Text>
                  </Button>
                </DialogTrigger>

                <DialogContent style={{ maxWidth: 640 }}>
                  <DialogTitle color="gray">Add User</DialogTitle>

                  <Flex direction="column" gap="3" mt="5">
                    <Input label="Nama" id="name" />

                    <Flex direction="column" gap="2" width="100%">
                      <Text as="label">Role</Text>
                      <SelectRoot size="3">
                        <SelectTrigger placeholder="Pilih Role" />
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="konselor">Konselor</SelectItem>
                          <SelectItem value="STEMBA CLUB">
                            STEMBA CLUB
                          </SelectItem>
                        </SelectContent>
                      </SelectRoot>
                    </Flex>

                    <Input label="Email" id="email" />

                    <Input label="Kata Sandi" id="password" />
                  </Flex>

                  <Flex direction="column" width="100%" gap="2" mt="4">
                    <DialogClose>
                      <Button color="blue" className="cursor-pointer">
                        Simpan dan Tambah
                      </Button>
                    </DialogClose>
                    <DialogClose>
                      <Button color="red" className="cursor-pointer">
                        Batal
                      </Button>
                    </DialogClose>
                  </Flex>
                </DialogContent>
              </DialogRoot>

              <DialogRoot>
                <DialogTrigger>
                  <Button
                    variant="solid"
                    color="red"
                    size="3"
                    className="cursor-pointer"
                  >
                    <TrashIcon />
                    <Text weight="regular">Hapus</Text>
                  </Button>
                </DialogTrigger>
                <DialogContent style={{ maxWidth: 400 }}>
                  <DialogTitle>Yakin ingin menghapus user?</DialogTitle>
                  <DialogDescription>
                    <Text color="gray">
                      Pastikan user yang kamu pilih sudah tepat ya.
                    </Text>
                  </DialogDescription>

                  <Flex
                    direction="row"
                    width="100%"
                    gap="2"
                    mt="4"
                    justify="end"
                  >
                    <DialogClose>
                      <Button
                        variant="outline"
                        color="red"
                        className="cursor-pointer"
                      >
                        Tidak, pilih lagi
                      </Button>
                    </DialogClose>
                    <DialogClose>
                      <Button
                        variant="solid"
                        color="red"
                        className="cursor-pointer"
                      >
                        Ya, hapus
                      </Button>
                    </DialogClose>
                  </Flex>
                </DialogContent>
              </DialogRoot>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Flex direction="row" gap="3" align="center">
            <Text color="gray">Tampilkan</Text>
            <SelectRoot size="1">
              <SelectTrigger placeholder="10" />
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </SelectRoot>
            <Text color="gray">Data</Text>
          </Flex>
        </Flex>
        <TableRoot variant="surface">
          <TableHeader>
            <TableRow>
              <TableColumnHeaderCell>Nama</TableColumnHeaderCell>
              <TableColumnHeaderCell>Role</TableColumnHeaderCell>
              <TableColumnHeaderCell>Action</TableColumnHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name}>
                <TableRowHeaderCell>
                  <Flex align="center" gap="3">
                    <Checkbox size="3" />
                    <Avatar src={item.avatar} fallback={item.name[0]} />
                    <Text>{item.name}</Text>
                  </Flex>
                </TableRowHeaderCell>
                <TableCell>
                  <Text>
                    {item.role === "User" ? (
                      <Badge variant="soft" color="blue">
                        {item.role}
                      </Badge>
                    ) : item.role === "Admin" ? (
                      <Badge variant="soft" color="red">
                        {item.role}
                      </Badge>
                    ) : item.role === "Konselor" ? (
                      <Badge variant="soft" color="green">
                        {item.role}
                      </Badge>
                    ) : item.role === "STEMBA CLUB" ? (
                      <Badge variant="soft" color="yellow">
                        {item.role}
                      </Badge>
                    ) : null}
                  </Text>
                </TableCell>
                <TableCell>
                  <DialogRoot>
                    <DialogTrigger>
                      <Text
                        color="indigo"
                        weight="regular"
                        className="cursor-pointer"
                      >
                        Lihat detail
                      </Text>
                    </DialogTrigger>
                    <DialogContent>
                      <Flex direction="row" align="center" gap="3">
                        <DialogClose>
                          <Cross2Icon className="cursor-pointer mb-3" />
                        </DialogClose>
                        <DialogTitle>Detail User</DialogTitle>
                      </Flex>

                      <Flex direction="column" gap="5" mt="3">
                        <Image
                          src={item.avatar}
                          width={125}
                          height={125}
                          alt="avatar"
                          className="mx-auto"
                        />
                        <Flex direction="column" gap="3">
                          <Text>Nama</Text>
                          <TextFieldRoot>
                            <Flex direction="row" align="center">
                              <TextFieldSlot>
                                <PersonIcon height="14" width="14" />
                              </TextFieldSlot>
                              <TextFieldInput
                                size="3"
                                value={item.name}
                                disabled
                              />
                            </Flex>
                          </TextFieldRoot>
                        </Flex>
                        <Flex direction="column" gap="3" width="auto">
                          <Text>Role</Text>
                          <Flex>
                            {item.role === "User" ? (
                              <Badge variant="soft" color="blue">
                                {item.role}
                              </Badge>
                            ) : item.role === "Admin" ? (
                              <Badge variant="soft" color="red">
                                {item.role}
                              </Badge>
                            ) : item.role === "Konselor" ? (
                              <Badge variant="soft" color="green">
                                {item.role}
                              </Badge>
                            ) : item.role === "STEMBA CLUB" ? (
                              <Badge variant="soft" color="yellow">
                                {item.role}
                              </Badge>
                            ) : null}
                          </Flex>
                        </Flex>
                        <Flex direction="column" gap="3">
                          <Text>Email</Text>
                          <TextFieldRoot>
                            <Flex direction="row" align="center">
                              <TextFieldSlot>
                                <EnvelopeClosedIcon height="14" width="14" />
                              </TextFieldSlot>
                              <TextFieldInput
                                size="3"
                                value={item.email}
                                disabled
                              />
                            </Flex>
                          </TextFieldRoot>
                        </Flex>

                        <Flex direction="column" gap="3">
                          <Text>Tanggal bergabung</Text>
                          <Flex className="row" align="center" gap="2">
                            <CalendarIcon />
                            <Text color="gray">14/01/2024</Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </DialogContent>
                  </DialogRoot>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Flex>
    </AdminDashboardLayout>
  );
}
