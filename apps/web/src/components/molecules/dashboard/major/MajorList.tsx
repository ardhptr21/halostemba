"use client";

import { MajorEntity } from "@halostemba/entities";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Flex,
  IconButton,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import { useState } from "react";
import { useGetListMajors } from "~/apis/majors/get-list-majors";
import DeleteMajorModal from "./MajorDelete";
import EditMajorModal from "./MajorEdit";

interface Props {
  session: Session;
}

export default function MajorList({ session }: Props) {
  const { data, isFetching } = useGetListMajors();
  const [majorEdit, setMajorEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [major, setMajor] = useState<MajorEntity | null>(null);

  if (isFetching) return "Loading...";

  return (
    <>
      <EditMajorModal
        open={majorEdit}
        onOpenChange={setMajorEdit}
        major={major || null}
        session={session}
      />
      <DeleteMajorModal
        open={deleteModal}
        onOpenChange={setDeleteModal}
        majorId={major?.id || null}
        session={session}
      />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Major</TableColumnHeaderCell>
            <TableColumnHeaderCell>Action</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((major) => (
            <TableRow key={major.id}>
              <TableCell className="align-middle">
                <Flex direction="row" align="center" gap="2">
                  <Avatar size="3" src={major.logo} fallback={major.name[0]} />
                  <Text>{major.name}</Text>
                </Flex>
              </TableCell>
              <TableCell className="space-x-2 align-middle">
                <IconButton
                  variant="soft"
                  className="cursor-pointer"
                  onClick={() => {
                    setDeleteModal(true);
                    setMajor(major);
                  }}
                  color="red"
                >
                  <TrashIcon />
                </IconButton>
                <IconButton
                  variant="soft"
                  className="cursor-pointer"
                  onClick={() => {
                    setMajorEdit(true);
                    setMajor(major);
                  }}
                  color="blue"
                >
                  <Pencil1Icon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </>
  );
}
