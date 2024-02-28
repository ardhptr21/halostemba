"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import {
  IconButton,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  Text,
} from "@radix-ui/themes";

const data = {
  data: [
    {
      id: 1,
      major: "SIJA",
    },
    {
      id: 2,
      major: "KGSP",
    },
    {
      id: 3,
      major: "TFLM",
    },
    {
      id: 4,
      major: "TMPO",
    },
  ],
};

export default function MajorList() {
  return (
    <>
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Major</TableColumnHeaderCell>
            <TableColumnHeaderCell>Action</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="align-middle">
                <Text>{user.major}</Text>
              </TableCell>
              <TableCell className="space-x-2 align-middle">
                <IconButton
                  variant="soft"
                  className="cursor-pointer"
                  onClick={() => {}}
                  color="red"
                >
                  <TrashIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </>
  );
}
