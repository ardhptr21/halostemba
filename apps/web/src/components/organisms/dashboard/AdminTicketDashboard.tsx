"use client";

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
} from "@radix-ui/themes";
import { TableBody, TableCell, TableRow } from "@tremor/react";
import { Session } from "next-auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetTicketListApi } from "~/apis/ticket/get-list-ticket-api";
import TicketFilter from "~/components/molecules/dashboard/ticket/TicketFilter";

interface Props {
  session?: Session | null;
}
export default function AdminTicketDashboard({ session }: Props) {
  const searchParams = useSearchParams();

  const { data } = useGetTicketListApi(session?.token as string, {
    search: searchParams.get("search") as string,
    status: searchParams.get("status") as "WAITING" | "OPEN" | "CLOSED",
    perPage: Number(searchParams.get("perPage")) || 30,
    page: Number(searchParams.get("page")) || 1,
  });

  return (
    <>
      <Flex direction="row" width="100%" justify="between">
        <Heading size="8">Ticket</Heading>
        <Flex direction="row" gap="4">
          <TicketFilter />
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
          {data !== undefined
            ? data.map((item) => (
                <TableRow key={item.title}>
                  <TableRowHeaderCell>
                    <Text>{item.title}</Text>
                  </TableRowHeaderCell>
                  <TableCell>
                    <Text>
                      {item.status === "OPEN" ? (
                        <Badge variant="soft" color="green">
                          {item.status}
                        </Badge>
                      ) : item.status === "CLOSED" ? (
                        <Badge variant="soft" color="red">
                          {item.status}
                        </Badge>
                      ) : item.status === "WAITING" ? (
                        <Badge variant="soft" color="yellow">
                          {item.status}
                        </Badge>
                      ) : null}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/ticket/${item.id}`}
                      className="cursor-pointer"
                    >
                      <Text color="indigo">Lihat Detail</Text>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </TableRoot>
    </>
  );
}
