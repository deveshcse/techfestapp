/*
  Warnings:

  - You are about to drop the `TechFest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TechFest" DROP CONSTRAINT "TechFest_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TechFest" DROP CONSTRAINT "TechFest_updatedById_fkey";

-- DropTable
DROP TABLE "TechFest";

-- CreateTable
CREATE TABLE "tech_fest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "tech_fest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tech_fest" ADD CONSTRAINT "tech_fest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_fest" ADD CONSTRAINT "tech_fest_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
