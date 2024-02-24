"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Badge,
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
import Link from "next/link";
import AdminDashboardLayout from "~/components/layouts/admin/AdminDashboardLayout";

const data = [
  {
    name: "Pendaftaran KIP-k",
    status: "Open",
    ticket_id: "TICKET-0001",
  },
  {
    name: "Amherd Viola",
    status: "Closed",
    ticket_id: "TICKET-0002",
  },
  {
    name: "Amherd Viola",
    status: "Request",
    ticket_id: "TICKET-0003",
  },
  {
    name: "Amherd Viola",
    status: "Open",
    ticket_id: "TICKET-0004",
  },
];

export default function Ticket() {
  return (
    <AdminDashboardLayout>
      <Flex
        direction="column"
        gap="6"
        width="100%"
        className="px-16 py-9 mx-auto"
      >
        <Flex direction="row" width="100%" justify="between">
          <Heading size="8">Ticket</Heading>
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
                  <SelectItem value="request">Request</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="close">Close</SelectItem>
                </SelectContent>
              </SelectRoot>
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
              <TableColumnHeaderCell>Judul</TableColumnHeaderCell>
              <TableColumnHeaderCell>Status</TableColumnHeaderCell>
              <TableColumnHeaderCell>Action</TableColumnHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name}>
                <TableRowHeaderCell>
                  <Text>{item.name}</Text>
                </TableRowHeaderCell>
                <TableCell>
                  <Text>
                    {item.status === "Open" ? (
                      <Badge variant="soft" color="green">
                        {item.status}
                      </Badge>
                    ) : item.status === "Closed" ? (
                      <Badge variant="soft" color="red">
                        {item.status}
                      </Badge>
                    ) : item.status === "Request" ? (
                      <Badge variant="soft" color="yellow">
                        {item.status}
                      </Badge>
                    ) : null}
                  </Text>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/ticket/${item.ticket_id}`}
                    className="cursor-pointer"
                  >
                    <Text color="indigo">Lihat Detail</Text>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Flex>
    </AdminDashboardLayout>
  );
}
