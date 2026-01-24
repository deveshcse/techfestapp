/*
  Warnings:

  - You are about to drop the column `endDate` on the `TechFest` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `TechFest` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `TechFest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `TechFest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TechFest" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
