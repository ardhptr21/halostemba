/*
  Warnings:

  - You are about to drop the column `closedAt` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_menfess_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_ticket_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_id_fkey";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "closedAt",
ADD COLUMN     "closed_at" TIMESTAMP(3),
ADD COLUMN     "responded_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "Notification";

-- CreateTable
CREATE TABLE "medias" (
    "id" TEXT NOT NULL,
    "menfess_id" TEXT,
    "ticket_id" TEXT,
    "ticket_reply_id" TEXT,
    "source" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT,
    "type" "NotificationType" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT NOT NULL,
    "identifier" "NotificationIdentifier",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_menfess_id_fkey" FOREIGN KEY ("menfess_id") REFERENCES "menfesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_ticket_reply_id_fkey" FOREIGN KEY ("ticket_reply_id") REFERENCES "ticket_replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
