/*
  Warnings:

  - You are about to drop the column `verified` on the `students` table. All the data in the column will be lost.
  - Added the required column `major_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Made the column `id_card` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "students" DROP COLUMN "verified",
ADD COLUMN     "major_id" TEXT NOT NULL,
ALTER COLUMN "id_card" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "banned_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "verify_requests" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "major_id" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "id_card" TEXT NOT NULL,
    "note" TEXT,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verify_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "majors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "majors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "majors_name_key" ON "majors"("name");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verify_requests" ADD CONSTRAINT "verify_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verify_requests" ADD CONSTRAINT "verify_requests_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
