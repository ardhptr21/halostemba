-- CreateEnum
CREATE TYPE "NotificationIdentifier" AS ENUM ('comment', 'vote', 'ticket', 'verification', 'warning');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "identifier" "NotificationIdentifier";
