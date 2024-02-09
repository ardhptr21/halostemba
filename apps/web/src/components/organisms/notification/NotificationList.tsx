import { Flex } from "@radix-ui/themes";
import React from "react";
import NotificationCard from "~/components/molecules/notification/NotificationCard";

export default function NotificationList() {
  return (
    <Flex direction="column" gap="3">
      <NotificationCard
        title="Ticket"
        message="Selamat! Ticketmu telah direspon oleh Pak Singgih"
        createdAt="2024-02-09T08:26:26.712Z"
        type="SUCCESS"
        identifier="TICKET"
      />
      <NotificationCard
        title="STEMBA CLUB"
        message="Selamat !! Kamu sudah terdaftar menjadi anggota STEMBA CLUB."
        createdAt="2024-02-08T14:25:43.436Z"
        type="WARNING"
        identifier="VERIFICATION"
      />
      <NotificationCard
        title="Niall Horan berkomentar di postingan Anda"
        message="UWAAA KEREEENNN BANGETTT !!"
        createdAt="2024-02-05T10:03:03.589Z"
        image="http://localhost:8000/media/d2e7RafgEVY_BmyNqvcfzsidYlGN-qni.webp"
        type="INFO"
        identifier="COMMENT"
      />
      <NotificationCard
        title="STEMBA CLUB"
        message="Maaf, permintaan verifikasi kamu ditolak. Alasan: Kartu pelajar terindikasi adanya kepalsuan."
        createdAt="2024-02-05T08:59:53.714Z"
        type="WARNING"
        identifier="VERIFICATION"
      />
    </Flex>
  );
}
