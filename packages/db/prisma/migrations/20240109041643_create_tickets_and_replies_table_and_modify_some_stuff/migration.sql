/*
  Warnings:

  - The primary key for the `hashtags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `status` column on the `verify_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('waiting', 'open', 'closed');

-- DropForeignKey
ALTER TABLE "_HashtagToMenfess" DROP CONSTRAINT "_HashtagToMenfess_A_fkey";

-- AlterTable
ALTER TABLE "_HashtagToMenfess" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "hashtags" DROP CONSTRAINT "hashtags_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "hashtags_id_seq";

-- AlterTable
ALTER TABLE "verify_requests" DROP COLUMN "status",
ADD COLUMN     "status" "VerificationStatus" NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "reporter_id" TEXT NOT NULL,
    "responder_id" TEXT,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'waiting',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_replies" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_replies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_replies" ADD CONSTRAINT "ticket_replies_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_replies" ADD CONSTRAINT "ticket_replies_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToMenfess" ADD CONSTRAINT "_HashtagToMenfess_A_fkey" FOREIGN KEY ("A") REFERENCES "hashtags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
