"use client";

import { AdminVerificationEntity } from "@halostemba/entities";
import { CheckIcon, Cross1Icon, EyeOpenIcon } from "@radix-ui/react-icons";
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
  TableRowHeaderCell,
  Text,
} from "@radix-ui/themes";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useGetListVerifications } from "~/apis/verification/get-list-verification-api";
import Pagination from "~/components/atoms/Pagination";
import DetailRequestModal from "./DetailRequestModal";
import RequestAcceptModal from "./RequestAcceptModal";
import RequestRejectModal from "./RequestRejectModal";

interface RequestListProps {
  session: Session;
}

export default function RequestList({ session }: RequestListProps) {
  const searchParams = useSearchParams();
  const [req, setReq] = useState<AdminVerificationEntity | null>(null);
  const [accModal, setAccModal] = useState(false);
  const [rejModal, setRejModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  const { data, isFetching } = useGetListVerifications(session.token, {
    page: Number(searchParams.get("page")) || 1,
    perPage: Number(searchParams.get("perPage")) || 30,
  });

  if (isFetching) return "Loading...";

  return (
    <>
      <RequestAcceptModal
        userId={req?.user.id || null}
        session={session}
        open={accModal}
        onOpenChange={setAccModal}
      />
      <RequestRejectModal
        userId={req?.user.id || null}
        session={session}
        open={rejModal}
        onOpenChange={setRejModal}
      />
      <DetailRequestModal
        request={req}
        open={detailModal}
        onOpenChange={setDetailModal}
      />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Nama</TableColumnHeaderCell>
            <TableColumnHeaderCell>Jurusan</TableColumnHeaderCell>
            <TableColumnHeaderCell>NIS</TableColumnHeaderCell>
            <TableColumnHeaderCell>Tanggal Request</TableColumnHeaderCell>
            <TableColumnHeaderCell>Action</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((v) => (
            <TableRow key={v.id}>
              <TableRowHeaderCell>
                <Flex align="center" gap="3">
                  <Avatar src={v.user.avatar} fallback={v.user.name[0]} />
                  <Text>{v.user.name}</Text>
                </Flex>
              </TableRowHeaderCell>
              <TableCell className="align-middle">{v.major.name}</TableCell>
              <TableCell className="align-middle">{v.nis}</TableCell>
              <TableCell className="align-middle">
                {format(new Date(v.createdAt), "dd MMMM yyyy, HH:mm", {
                  locale: id,
                })}
              </TableCell>
              <TableCell className="space-x-2">
                <IconButton
                  variant="soft"
                  className="cursor-pointer"
                  onClick={() => {
                    setDetailModal(true);
                    setReq(v);
                  }}
                >
                  <EyeOpenIcon />
                </IconButton>
                <IconButton
                  variant="soft"
                  color="green"
                  className="cursor-pointer"
                  onClick={() => {
                    setAccModal(true);
                    setReq(v);
                  }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  variant="soft"
                  color="red"
                  className="cursor-pointer"
                  onClick={() => {
                    setRejModal(true);
                    setReq(v);
                  }}
                >
                  <Cross1Icon />
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
