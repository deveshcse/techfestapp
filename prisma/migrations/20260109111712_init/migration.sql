/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `activity_organizer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_createdById_fkey";

-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_event_id_fkey";

-- DropForeignKey
ALTER TABLE "activity_organizer" DROP CONSTRAINT "activity_organizer_activityId_fkey";

-- DropForeignKey
ALTER TABLE "activity_organizer" DROP CONSTRAINT "activity_organizer_userId_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_createdById_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "activity";

-- DropTable
DROP TABLE "activity_organizer";

-- DropTable
DROP TABLE "event";

-- DropEnum
DROP TYPE "Role";
