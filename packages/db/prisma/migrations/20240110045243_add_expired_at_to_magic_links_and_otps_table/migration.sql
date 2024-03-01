/*
  Warnings:

  - Added the required column `expired_at` to the `magic_links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expired_at` to the `otps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "magic_links" ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "otps" ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL;
