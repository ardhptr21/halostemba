-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video');

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "menfess_id" TEXT,
    "ticket_id" TEXT,
    "source" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_menfess_id_fkey" FOREIGN KEY ("menfess_id") REFERENCES "menfesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
