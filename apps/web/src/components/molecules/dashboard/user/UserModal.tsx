"use client";

import { UserEntity } from "@halostemba/entities";
import { Avatar, Badge, Dialog, Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { DialogRootProps } from "node_modules/@radix-ui/themes/dist/esm/components/dialog";
import Input from "~/components/atoms/form/Input";

interface Props extends DialogRootProps {
  user: UserEntity | null;
}

export default function DashboardUserModal({ user, ...props }: Props) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Content>
        <Dialog.Title>User Detail</Dialog.Title>
        <Flex align="center" justify="center">
          <Avatar
            size="8"
            src={user?.avatar}
            fallback={user?.name.at(0) || ""}
          />
        </Flex>
        <Flex gap="4" direction="column" mt="5">
          <Input label="Nama" id="name" value={user?.name} readOnly />
          <Input
            label="Username"
            id="username"
            value={user?.username}
            readOnly
          />
          <Input
            label="Email"
            type="email"
            id="email"
            value={user?.email}
            readOnly
          />
          <Flex direction="column">
            <Text as="label" mb="2" className="block">
              Role
            </Text>
            <Text as="p">
              {user?.role === "GUEST" ? (
                <Badge variant="soft" color="blue">
                  {user?.role}
                </Badge>
              ) : user?.role === "ADMIN" ? (
                <Badge variant="soft" color="red">
                  {user?.role}
                </Badge>
              ) : user?.role === "TEACHER" ? (
                <Badge variant="soft" color="green">
                  {user?.role}
                </Badge>
              ) : user?.role === "STUDENT" ? (
                <Badge variant="soft" color="yellow">
                  {user?.role}
                </Badge>
              ) : null}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text as="label" mb="2" className="block">
              Tanggal Bergabung
            </Text>
            <Text as="p" color="gray">
              {user?.createdAt &&
                format(new Date(user.createdAt), "dd MMMM yyyy")}
            </Text>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
