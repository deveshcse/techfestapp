/*
  Warnings:

  - You are about to drop the column `name` on the `TechFest` table. All the data in the column will be lost.
  - Added the required column `title` to the `TechFest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TechFest" DROP COLUMN "name",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL;
