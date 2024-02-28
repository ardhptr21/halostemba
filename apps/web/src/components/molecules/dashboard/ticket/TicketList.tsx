"use client";

import {
  Badge,
  Flex,
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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  IsTicketAdmin,
  useGetTicketListApi,
} from "~/apis/ticket/get-list-ticket-api";
import Pagination from "~/components/atoms/Pagination";

interface TicketListProps {
  session?: Session | null;
}

export default function TicketList({ session }: TicketListProps) {
  const searchParams = useSearchParams();

  const { data, isFetching } = useGetTicketListApi<IsTicketAdmin>(
    session?.token as string,
    {
      search: searchParams.get("search") as string,
      status: searchParams.get("status") as "WAITING" | "OPEN" | "CLOSED",
      perPage: Number(searchParams.get("perPage")) || 10,
      page: Number(searchParams.get("page")) || 1,
    },
  );

  if (isFetching) return "Loading...";

  return (
    <>
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Judul</TableColumnHeaderCell>
            <TableColumnHeaderCell>Status</TableColumnHeaderCell>
            <TableColumnHeaderCell>Action</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data.map((item) => (
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
          ))}
        </TableBody>
      </TableRoot>
      <Flex justify="center" align="center">
        <Pagination meta={data!.meta} />
      </Flex>
    </>
  );
}
