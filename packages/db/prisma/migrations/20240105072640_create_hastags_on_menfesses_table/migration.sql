-- CreateTable
CREATE TABLE "hashtags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hashtags_on_menfesses" (
    "menfess_id" TEXT NOT NULL,
    "hashtag_id" INTEGER NOT NULL,

    CONSTRAINT "hashtags_on_menfesses_pkey" PRIMARY KEY ("menfess_id","hashtag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hashtags_name_key" ON "hashtags"("name");

-- AddForeignKey
ALTER TABLE "hashtags_on_menfesses" ADD CONSTRAINT "hashtags_on_menfesses_menfess_id_fkey" FOREIGN KEY ("menfess_id") REFERENCES "menfesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hashtags_on_menfesses" ADD CONSTRAINT "hashtags_on_menfesses_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
