-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "ticket_reply_id" TEXT;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_ticket_reply_id_fkey" FOREIGN KEY ("ticket_reply_id") REFERENCES "ticket_replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
