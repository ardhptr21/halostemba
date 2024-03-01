-- CreateTable
CREATE TABLE "hashtags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HashtagToMenfess" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "hashtags_name_key" ON "hashtags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToMenfess_AB_unique" ON "_HashtagToMenfess"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToMenfess_B_index" ON "_HashtagToMenfess"("B");

-- AddForeignKey
ALTER TABLE "_HashtagToMenfess" ADD CONSTRAINT "_HashtagToMenfess_A_fkey" FOREIGN KEY ("A") REFERENCES "hashtags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToMenfess" ADD CONSTRAINT "_HashtagToMenfess_B_fkey" FOREIGN KEY ("B") REFERENCES "menfesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
