"use client";

import { UserEntity } from "@halostemba/entities";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Flex,
  IconButton,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  TableRowHeaderCell,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useGetListUsers } from "~/apis/user/get-list-user-api";
import Pagination from "~/components/atoms/Pagination";
import DashboardUserModal from "~/components/molecules/dashboard/user/UserModal";

interface UserListProps {
  session: Session;
}

export default function UserList({ session }: UserListProps) {
  const searchParams = useSearchParams();

  const { data, isFetching } = useGetListUsers(session.token, {
    search: searchParams.get("search"),
    role: searchParams.get("role") as UserEntity["role"],
    perPage: Number(searchParams.get("perPage")) || 30,
    page: Number(searchParams.get("page")) || 1,
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null);

  if (isFetching) return "Loading...";

  return (
    <>
      <DashboardUserModal
        open={showUserModal}
        onOpenChange={setShowUserModal}
        user={selectedUser}
      />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Nama</TableColumnHeaderCell>
            <TableColumnHeaderCell>Role</TableColumnHeaderCell>
            <TableColumnHeaderCell>Action</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((user) => (
            <TableRow key={user.id}>
              <TableRowHeaderCell>
                <Flex align="center" gap="3">
                  <Avatar src={user.avatar} fallback={user.name[0]} />
                  <Text>{user.name}</Text>
                </Flex>
              </TableRowHeaderCell>
              <TableCell className="align-middle">
                <Text>
                  {user.role === "GUEST" ? (
                    <Badge variant="soft" color="blue">
                      {user.role}
                    </Badge>
                  ) : user.role === "ADMIN" ? (
                    <Badge variant="soft" color="red">
                      {user.role}
                    </Badge>
                  ) : user.role === "TEACHER" ? (
                    <Badge variant="soft" color="green">
                      {user.role}
                    </Badge>
                  ) : user.role === "STUDENT" ? (
                    <Badge variant="soft" color="yellow">
                      {user.role}
                    </Badge>
                  ) : null}
                </Text>
              </TableCell>
              <TableCell className="space-x-2 align-middle">
                <IconButton
                  variant="soft"
                  className="cursor-pointer"
                  onClick={() => {
                    setShowUserModal(true);
                    setSelectedUser(user);
                  }}
                >
                  <EyeOpenIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
      <Flex justify="center" align="center">
        <Pagination meta={data!.meta} />
      </Flex>
    </>
  );
}
