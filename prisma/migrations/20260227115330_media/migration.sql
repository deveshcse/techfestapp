-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'PDF');

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT,
    "type" "MediaType" NOT NULL,
    "caption" TEXT,
    "techFestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "media_techFestId_idx" ON "media"("techFestId");

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_techFestId_fkey" FOREIGN KEY ("techFestId") REFERENCES "tech_fest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
